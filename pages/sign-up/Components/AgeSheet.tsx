import { motion } from "framer-motion";
import { SheetAnimation } from "./Sheet";

type AgeSheetProps = {
  onClose: () => void;
  showSheet: boolean;
  onSelected: (age: string) => void;
};

export const AgeSheet = ({ onClose, showSheet, onSelected }: AgeSheetProps) => {
  const ageRanges = [
    "10대 이하",
    "10대",
    "20대",
    "30대",
    "40대",
    "50대",
    "60대 이상",
  ];

  return (
    <motion.div
      initial="hidden"
      animate={showSheet ? "visible" : "hidden"}
      variants={SheetAnimation}
      className="fixed bottom-0 z-20 bg-white border-1 border-black w-full h-4/5 rounded-2xl px-6 pb-6"
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
      <div className="gray-line mt-4" />
      {ageRanges.map((ageRange) => (
        <div
          key={ageRange}
          className="px-4 py-5 border-b-[1px] border-gray-2 cursor-pointer"
          onClick={() => {
            onSelected(ageRange);
            onClose();
          }}
        >
          <div className="flex justify-center mx-auto font-base">
            {ageRange}
          </div>
        </div>
      ))}
    </motion.div>
  );
};
