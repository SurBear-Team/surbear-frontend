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
      className="fixed bottom-0 z-20 bg-white border-1 border-black w-full h-4/5 rounded-2xl px-6 pb-6 "
    >
      <div className="flex pt-4 gap-1 font-extrabold ">
        <div className="cursor-pointer" onClick={onClose}>
          X
        </div>
        <div>닫기</div>
      </div>
      {/* 회색 선 */}
      <div className="gray-line my-4" />
      {/* 개인정보수집및활용동의 */}
      <span className="pt-4 font-extrabold text-[#101010]">{term?.title}</span>
      {/* 본문 */}
      <div className="bg-[#F5F5F5] max-h-[calc(80%-1rem)] flex-grow mt-4 p-4 font-extrabold rounded-xl overflow-y-scroll hide-scrollbar">
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
