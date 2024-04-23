import { useRouter } from "next/router";
import { useState } from "react";
import axios from "axios";
import { TopBar } from "@/pages/components/TopBar/TopBar";
import { Dialog } from "@/pages/components/Dialog";

interface DialogState {
  open: boolean;
  title: string;
}

export default function FindId() {
  const router = useRouter();

  const [inputEmail, setInputEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [codeSent, setCodeSent] = useState(false);

  const [dialog, setDialog] = useState<DialogState>({
    open: false,
    title: "",
  });

  const handleSendCode = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(inputEmail)) {
      setDialog({
        open: true,
        title: "유효하지 않은 이메일이에요",
      });
      return;
    }
    try {
      // 인증번호 전송 API 호출
      await axios.post("/surbear-veri-post", { inputEmail });
      setDialog({
        open: true,
        title: "인증번호가 전송되었어요",
      });
      setCodeSent(true);
    } catch (error) {
      console.error(error);
      setDialog({
        open: true,
        title: "네트워크 오류가 발생했어요",
      });
    }
  };

  const handleVerifyCode = async () => {
    try {
      const response = await axios.get(`/surbear-vier-get`);
      if (response.data.success) {
        setIsVerified(true);
        setDialog({
          open: true,
          title: "인증에 성공했어요",
        });
      } else {
        setDialog({
          open: true,
          title: "인증에 실패했어요",
        });
      }
    } catch (error) {
      console.error(error);
      setDialog({
        open: true,
        title: "네트워크 오류가 발생했어요",
      });
    }
  };

  const handleNext = () => {
    {
      isVerified
        ? router.push("/")
        : setDialog({
            open: true,
            title: "이메일 인증을 완료해주세요",
          });
    }
  };

  return (
    <>
      <TopBar hasBack title="아이디 찾기" noShadow />
      <div className="white-screen flex-col">
        <div className="inner-screen px-10">
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
              onClick={handleSendCode}
            >
              {codeSent ? "인증번호 재발급" : "인증번호 받기"}
            </button>
          </div>
          {/* 인증번호 */}
          <div className="w-full">
            <span className="font-semibold">인증번호</span>
            <input
              type="number"
              placeholder="인증번호를 입력해주세요"
              className={`main-input mt-1 mb-2 text-gray-9`}
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
            />
            <button
              className={`long-button bg-white ${
                verificationCode
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
