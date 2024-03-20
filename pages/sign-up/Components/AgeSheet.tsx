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
      <div className="flex pt-4 gap-1 font-extrabold ">
        <div className="cursor-pointer" onClick={onClose}>
          X
        </div>
        <div>닫기</div>
      </div>
      <div className="gray-line my-4" />
      {ageRanges.map((ageRange) => (
        <div
          key={ageRange}
          className="px-4 py-5 border-b-[1px] border-gray-2 cursor-pointer"
          onClick={() => {
            onSelected(ageRange);
            onClose();
          }}
        >
          <div className="flex justify-center mx-auto font-extrabold">
            {ageRange}
          </div>
        </div>
      ))}
    </motion.div>
  );
};
