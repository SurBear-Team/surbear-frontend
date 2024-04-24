import { useRouter } from "next/router";
import { useState } from "react";
import { TopBar } from "../components/TopBar/TopBar";
import { Dialog } from "../components/Dialog";
import api from "../api/config";
import { useRecoilState } from "recoil";
import { userEmailAtom } from "./userState";
import { AxiosError } from "axios";

interface DialogState {
  open: boolean;
  title: string;
}

export default function Authentication() {
  const router = useRouter();

  const [inputEmail, setInputEmail] = useState(""); // 입력 이메일
  const [inputVeriCode, setInputVeriCode] = useState(""); // 입력 인증번호
  const [veriCode, setVeriCode] = useState(""); // POST하고 받은 인증번호

  const [isVerified, setIsVerified] = useState(false); // 인증이 됐나요?
  const [codeSent, setCodeSent] = useState(false); // 번호가 갔나요?

  const [, setUserEmail] = useRecoilState(userEmailAtom);

  // 다이얼로그
  const [dialog, setDialog] = useState<DialogState>({
    open: false,
    title: "",
  });

  // 가입된 메일인지 확인
  const checkDuplicate = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(inputEmail)) {
      setDialog({
        open: true,
        title: "유효하지 않은 이메일이에요",
      });
      return; // 잘못된 이메일 입력하고 버튼 누르면 함수 종료
    }
    try {
      const response = await api.post("/member/verification/duplicate", {
        type: "email",
        value: inputEmail,
      });

      if (response.data === true) {
        handleSendCode();
      } else {
        setDialog({
          open: true,
          title: "인증번호 전송에 실패했어요",
        });
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error(axiosError);
      // (409) 이미 가입한 이메일이면
      if (axiosError.response && axiosError.response.status === 409) {
        setDialog({
          open: true,
          title: "이미 가입한 이메일이에요",
        });
      } else {
        setDialog({
          open: true,
          title: "네트워크 오류가 발생했어요",
        });
      }
    }
  };

  // 인증번호 받기
  const handleSendCode = async () => {
    try {
      const response = await api.post("/mail", {
        email: inputEmail,
      });
      setVeriCode(response.data); // POST하고 받은 번호 저장

      setDialog({
        open: true,
        title: "인증번호가 전송되었어요",
      });
      setCodeSent(true); // 코드 받았음 true

      // 5분 후 인증번호 초기화 및 세션 만료 알림
      setTimeout(() => {
        setVeriCode("");
        setDialog({
          open: true,
          title: "세션이 만료됐어요 다시 인증해주세요",
        });
        setInputVeriCode("");
      }, 5 * 60 * 1000); // 5분
    } catch (error) {
      console.error(error);
      setDialog({
        open: true,
        title: "네트워크 오류가 발생했어요",
      });
    }
  };

  // 인증번호 확인
  const handleVerifyCode = async () => {
    try {
      const response = await api.post(`/mail/certification`, {
        userCertification: inputVeriCode,
        serverCertification: veriCode,
      });

      if (response.status === 200) {
        setIsVerified(true); // 인증성공 true
        setDialog({
          open: true,
          title: "인증에 성공했어요",
        });
        setUserEmail(inputEmail); // recoil에 이메일 저장
      } else {
        setDialog({
          open: true,
          title: "인증에 실패했어요",
        });
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error(axiosError);
      // (401) 인증번호 틀리면
      if (axiosError.response && axiosError.response.status === 401) {
        setDialog({
          open: true,
          title: "인증 번호를 확인해주세요",
        });
      } else {
        setDialog({
          open: true,
          title: "네트워크 오류가 발생했어요",
        });
      }
    }
  };

  // 다음 버튼
  const handleNext = () => {
    {
      isVerified
        ? router.push("/sign-up")
        : setDialog({
            open: true,
            title: "이메일 인증을 완료해주세요",
          });
    }
  };

  return (
    <>
      <TopBar hasBack noShadow title="회원가입" />
      <div className="white-screen">
        <div className="inner-screen px-12 flex-col">
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
              className="long-button bg-white border-primary-1 text-primary-1"
              onClick={checkDuplicate}
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
              className="long-button px-32 mt-8 font-semibold bg-white border-primary-1 text-primary-1"
              onClick={handleNext}
            >
              다음
            </button>
          </div>

          {dialog.open && (
            <Dialog
              title={dialog.title}
              rightText="확인"
              onRightClick={() => {
                setDialog((current) => ({ ...current, open: false }));
              }}
              onlyOneBtn
            />
          )}
        </div>
      </div>
    </>
  );
}
