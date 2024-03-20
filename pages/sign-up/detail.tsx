import { useRouter } from "next/router";
import { TopBar } from "../components/TopBar";
import { useEffect, useState } from "react";
import { Overlay } from "../components/styles/Overlay";
import { motion } from "framer-motion";

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
      <TopBar onClick={() => router.back()} leftSVG={"⬅"} />
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

type AgeSheetProps = {
  onClose: () => void;
  showSheet: boolean;
  onSelected: (age: string) => void;
};

export const AgeSheet = ({ onClose, showSheet, onSelected }: AgeSheetProps) => {
  return (
    <motion.div
      initial="hidden"
      animate={showSheet ? "visible" : "hidden"}
      variants={SheetAnimation}
      className="fixed bottom-0 z-20 bg-white border-1 border-black w-full h-3/5 rounded-2xl px-6 pb-6 "
    >
      <div className="flex pt-4 gap-1 font-extrabold ">
        <div className="cursor-pointer" onClick={onClose}>
          X
        </div>
        <div>닫기</div>
      </div>
      <div className="gray-line my-4" />
      <div
        className="px-4 py-5 border-b-[1px] border-gray-2"
        onClick={() => {
          onSelected("10대 이하");
          onClose();
        }}
      >
        <div className="flex justify-center mx-auto font-extrabold">
          10대 이하
        </div>
      </div>
      <div className="px-4 py-5 border-b-[1px] border-gray-2">
        <div
          className="flex justify-center mx-auto font-extrabold"
          onClick={() => {
            onSelected("10대");
            onClose();
          }}
        >
          10대
        </div>
      </div>

      <div
        className="px-4 py-5 border-b-[1px] border-gray-2"
        onClick={() => {
          onSelected("20대");
          onClose();
        }}
      >
        <div className="flex justify-center mx-auto font-extrabold">20대</div>
      </div>

      <div
        className="px-4 py-5 border-b-[1px] border-gray-2"
        onClick={() => {
          onSelected("30대");
          onClose();
        }}
      >
        <div className="flex justify-center mx-auto font-extrabold">30대</div>
      </div>

      <div
        className="px-4 py-5 border-b-[1px] border-gray-2"
        onClick={() => {
          onSelected("40대");
          onClose();
        }}
      >
        <div className="flex justify-center mx-auto font-extrabold">40대</div>
      </div>

      <div
        className="px-4 py-5 border-b-[1px] border-gray-2"
        onClick={() => {
          onSelected("50대");
          onClose();
        }}
      >
        <div className="flex justify-center mx-auto font-extrabold">50대</div>
      </div>

      <div className="px-4 py-5">
        <div
          className="flex justify-center mx-auto font-extrabold"
          onClick={() => {
            onSelected("60대 이상");
            onClose();
          }}
        >
          60대 이상
        </div>
      </div>
    </motion.div>
  );
};

export const SheetAnimation = {
  hidden: {
    y: 500, // 시작 위치 (아래에서 위로 이동)
  },
  visible: {
    y: 0, // 최종 위치 (화면 중앙)

    transition: {
      damping: 20, // 애니메이션의 바운스 정도
      stiffness: 100, // 애니메이션의 빠르기
    },
  },
};
