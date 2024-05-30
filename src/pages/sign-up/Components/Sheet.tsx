import { termsContents } from "./TermContents";
import { motion } from "framer-motion";

export const Sheet = ({
  onClose,
  termKey,
  showSheet,
}: {
  onClose: () => void;
  termKey: string;
  showSheet: boolean;
}) => {
  const term = termsContents[termKey];
  return (
    <motion.div
      initial="hidden"
      animate={showSheet ? "visible" : "hidden"}
      variants={SheetAnimation}
      className="fixed bottom-0 z-50 bg-white border-1 border-black w-full h-4/5 rounded-2xl px-6 pb-6"
    >
      <div className="flex pt-4 gap-1 cursor-pointer" onClick={onClose}>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 4L4 12M4 4L12 12"
            stroke="#101010"
            strokeWidth="1.33333"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <div className="font-semibold text-xs mt-[1px]">닫기</div>
      </div>
      {/* 회색 선 */}
      <div className="gray-line my-4" />
      {/* 개인정보수집및활용동의 */}
      <span className="pt-4 font-semibold text-gray-9">{term?.title}</span>
      {/* 본문 */}
      <div className="bg-gray-1 max-h-[calc(80%-1rem)] flex-grow mt-4 p-4 font-semibold rounded-xl overflow-y-scroll hide-scrollbar whitespace-pre-wrap">
        {term?.content}
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
