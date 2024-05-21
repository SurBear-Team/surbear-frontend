import api from "@/pages/api/config";
import { Dialog } from "@/pages/components/Dialog";
import { TopBar } from "@/pages/components/TopBar/TopBar";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { findIdAtom } from "../findStatus";
import { useOneBtnDialog } from "@/pages/hooks/useOneBtnDialog";

export default function FindPwd() {
  const router = useRouter();

  const [inputId, setInputId] = useState("");
  const [inputEmail, setInputEmail] = useState("");

  const [inputVeriCode, setInputVeriCode] = useState("");
  const [veriCode, setVeriCode] = useState("");

  const [isVerified, setIsVerified] = useState(false);
  const [codeSent, setCodeSent] = useState(false);

  const [, setUserId] = useRecoilState(findIdAtom);

  const { oneBtnDialog, showOneBtnDialog, hideOneBtnDialog } =
    useOneBtnDialog();

  const veriEmail = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(inputEmail)) {
      showOneBtnDialog("유효하지 않은 이메일이에요");
      return;
    }
    try {
      const response = await api.get(
        `/member/verification/password?userId=${inputId}&email=${inputEmail}`
      );

      if (response.status === 200) {
        handleSendCode();
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error(axiosError);
      if (axiosError.response && axiosError.response.status === 404) {
        showOneBtnDialog("아이디 혹은 이메일을 확인해주세요");
      }
    }
  };

  const handleSendCode = async () => {
    try {
      const response = await api.post("/mail", {
        email: inputEmail,
      });
      setVeriCode(response.data);
      showOneBtnDialog("인증번호가 전송되었어요");
      setCodeSent(true);

      // 5분 후 인증번호 초기화 및 세션 만료 알림
      setTimeout(() => {
        setVeriCode("");
        showOneBtnDialog("세션이 만료됐어요 다시 인증해주세요");
        setInputVeriCode("");
      }, 5 * 60 * 1000); // 5분
    } catch (error) {
      console.error(error);
      showOneBtnDialog(
        "네트워크 오류가 발생했습니다. 나중에 다시 시도해주세요"
      );
    }
  };

  const handleVerifyCode = async () => {
    try {
      const response = await api.post(`/mail/certification`, {
        userCertification: inputVeriCode,
        serverCertification: veriCode,
      });

      if (response.status === 200) {
        setIsVerified(true);
        showOneBtnDialog("인증에 성공했어요");
      } else {
        showOneBtnDialog("인증에 실패했어요");
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error(axiosError);
      if (axiosError.response && axiosError.response.status === 401) {
        showOneBtnDialog("인증 번호를 확인해주세요");
      } else {
        showOneBtnDialog("네트워크 오류가 발생했어요");
      }
    }
  };

  const handleNext = () => {
    if (isVerified) {
      setUserId(inputEmail);
      router.push("/sign-in/find-pwd/new-pwd");
    } else {
      showOneBtnDialog("이메일 인증을 완료해주세요");
    }
  };

  return (
    <>
      <TopBar
        hasBack
        onLeftClick={() => {
          router.push("/sign-in");
        }}
        title="비밀번호 재설정"
        noShadow
      />
      <div className="white-screen flex-col">
        <div className="inner-screen px-10">
          {/* 이메일 */}
          <div className="mb-10 w-full">
            <span className="font-semibold">아이디</span>
            <input
              type="text"
              placeholder="아이디를 입력해주세요"
              className="main-input mt-1 mb-2 text-gray-9"
              value={inputId}
              onChange={(e) => setInputId(e.target.value)}
            />
          </div>

          {/* 이메일 */}
          <div className="mb-10 w-full">
            <span className="font-semibold">이메일</span>
            <input
              type="email"
              placeholder="이메일을 입력해주세요"
              className="main-input mt-1 mb-2 text-gray-9"
              value={inputEmail}
              onChange={(e) => setInputEmail(e.target.value)}
            />
            <button
              className="long-button white-bg-primary-btn"
              onClick={veriEmail}
            >
              {codeSent ? "인증번호 재발급" : "인증번호 받기"}
            </button>
          </div>
          {/* 인증번호 */}
          <div className="w-full">
            <span className="font-semibold">인증번호</span>
            <input
              type="text"
              placeholder="인증번호를 입력해주세요"
              className={`main-input mt-1 mb-2 text-gray-9`}
              value={inputVeriCode}
              onChange={(e) => setInputVeriCode(e.target.value)}
            />
            <button
              className={`long-button bg-white ${
                inputVeriCode
                  ? "border-primary-1 text-primary-1"
                  : "border-gray-5 text-gray-5"
              }`}
              onClick={handleVerifyCode}
            >
              인증번호 확인
            </button>
          </div>

          <div className="gray-line w-full mt-12 mx-10" />
          {/* 다음버튼 */}
          <div className="w-full">
            <button
              className="long-button px-32 mt-8 font-semibold white-bg-primary-btn"
              onClick={handleNext}
            >
              다음
            </button>
          </div>

          {oneBtnDialog.open && (
            <Dialog
              title={oneBtnDialog.title}
              rightText="확인"
              onlyOneBtn
              onRightClick={hideOneBtnDialog}
            />
          )}
        </div>
      </div>
    </>
  );
}
