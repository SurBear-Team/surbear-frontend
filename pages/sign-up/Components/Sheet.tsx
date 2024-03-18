import { termsContents } from "./TermContents";

export const Sheet = ({
  onClose,
  termKey,
}: {
  onClose: () => void;
  termKey: string;
}) => {
  const term = termsContents[termKey];
  return (
    <div className="fixed bottom-0 z-20 bg-white border-1 border-black w-full h-4/5 rounded-2xl px-6 pb-6 ">
      <div className="flex pt-4 gap-1 font-extrabold">
        <div onClick={onClose}>X</div>
        <div>닫기</div>
      </div>
      {/* 회색 선 */}
      <div className="bg-[#EEEEEE] h-[1px] flex justify-center my-4" />
      {/* 개인정보수집및활용동의 */}
      <span className="pt-4 font-extrabold text-[#101010]">{term?.title}</span>
      {/* 본문 */}
      <div className="bg-[#F5F5F5] max-h-[calc(80%-1rem)] flex-grow mt-4 p-4 font-extrabold rounded-xl overflow-y-scroll hide-scrollbar">
        {term?.content}
      </div>
    </div>
  );
};
