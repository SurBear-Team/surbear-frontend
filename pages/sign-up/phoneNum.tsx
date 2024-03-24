import { useRouter } from "next/router";
import { TopBar } from "../components/TopBar";
import { useState } from "react";
import axios from "axios";
import { ArrowBackIcon } from "../components/styles/Icons";

export default function PhoneNum() {
  const router = useRouter();

  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [codeSent, setCodeSent] = useState(false);

  const handleSendCode = async () => {
    // 전화번호 유효성 검사 (간단한 예시)
    if (!phoneNumber || phoneNumber.length < 11) {
      alert("유효하지 않은 전화번호입니다.");
      return;
    }
    try {
      // 인증번호 전송 API 호출
      await axios.post("/surbear-veri-post", { phoneNumber });
      alert("인증번호가 전송되었습니다.");
      setCodeSent(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleVerifyCode = async () => {
    try {
      const response = await axios.get(`/surbear-vier-get`);
      if (response.data.success) {
        setIsVerified(true);
        alert("인증에 성공했습니다.");
      } else {
        alert("인증에 실패했습니다.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleNext = () => {
    if (!isVerified) {
      alert("먼저 전화번호 인증을 완료해 주세요.");
    } else {
      // 인증 성공 후 처리
      alert("인증 성공! 다음 단계로 진행합니다.");
    }
  };

  return (
    <>
      <TopBar
        onLeftClick={() => router.back()}
        leftSVG={<ArrowBackIcon />}
        title="회원가입"
      />
      <div className="screen px-12 flex-col">
        {/* 전화번호 */}
        <div className="mb-10 w-full">
          <span className="font-semibold">전화번호</span>
          <input
            type="number"
            placeholder="'-'를 제외한 전화번호를 입력해주세요"
            className="main-input mt-1 mb-2 text-gray-9"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
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
      </div>
    </>
  );
}
