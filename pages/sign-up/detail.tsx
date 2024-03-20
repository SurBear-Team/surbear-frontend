import { useRouter } from "next/router";
import { TopBar } from "../components/TopBar";
import { useEffect, useState } from "react";
import { Overlay } from "../components/styles/Overlay";
import { AgeSheet } from "./Components/AgeSheet";
import { ArrowBackIcon } from "../components/styles/Icons";

export default function IdPassword() {
  const router = useRouter();

  const [selectedAge, setSelectedAge] = useState("20대");
  const [showSheet, setShowSheet] = useState(false);

  const toggleShowSheet = () => {
    setShowSheet(!showSheet);
  };

  const [selectedGender, setSelectedGender] = useState("남자");

  // 콘솔찍기
  useEffect(() => {
    console.log("나이", selectedAge);
    console.log("성별", selectedGender);
  }, [selectedAge, selectedGender]);

  return (
    <>
      <TopBar
        onClick={() => router.back()}
        leftSVG={<ArrowBackIcon />}
        title="회원가입"
      />
      <div className="screen px-12 flex-col w-full">
        {/* 닉네임 */}
        <div className="w-full">
          <span className="font-extrabold">닉네임</span>
          <input
            type="text"
            placeholder="닉네임을 입력해주세요"
            className="main-input mt-1 mb-10 text-gray-9"
          />
        </div>
        {/* 나이 */}
        <div className="w-full">
          <span className="font-extrabold">나이</span>
          <input
            onClick={() => {
              setShowSheet(true);
            }}
            value={selectedAge}
            className="main-input text-center mt-1 mb-10 text-gray-9 cursor-pointer"
          />
        </div>
        {/* 성별 */}
        <div className="w-full">
          <span className="font-extrabold ">성별</span>
          <div className="flex gap-4 mt-1">
            <button
              className={`long-button ${
                selectedGender === "남자"
                  ? "border-primary-1 bg-primary-1 text-white"
                  : "border-primary-1"
              }`}
              onClick={() => setSelectedGender("남자")}
            >
              남자
            </button>
            <button
              className={`long-button ${
                selectedGender === "여자"
                  ? "border-primary-1 bg-primary-1 text-white"
                  : "border-primary-1"
              }`}
              onClick={() => setSelectedGender("여자")}
            >
              여자
            </button>
          </div>
        </div>

        <div className="gray-line w-full mt-12 mx-10" />

        {/* 다음버튼 */}
        <div className="w-full">
          <button
            className="long-button px-32 mt-8 font-extrabold bg-white border-primary-1 text-primary-1"
            onClick={() => {
              router.push("/sign-up/complete");
            }}
          >
            다음
          </button>
        </div>
        {showSheet && (
          <>
            <Overlay />
            <AgeSheet
              showSheet={showSheet}
              onClose={toggleShowSheet}
              onSelected={setSelectedAge}
            />
          </>
        )}
      </div>
    </>
  );
}
