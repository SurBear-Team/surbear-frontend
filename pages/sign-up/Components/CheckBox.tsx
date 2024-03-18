interface CheckBoxProps {
  inputChecked: boolean;
  onClick: () => void;
  label: string;
  isAll?: boolean;
  showSheet?: any;
}

export const Checkbox = ({
  inputChecked,
  onClick,
  label,
  isAll,
  showSheet,
}: CheckBoxProps) => (
  <div className="flex items-center gap-4 px-[20px] py-[22px]">
    <div
      onClick={onClick}
      className={`px-[7px] py-[7px] rounded-md cursor-pointer border-2 border-[#616161]
            ${inputChecked ? "bg-[#6E7CF2]" : "bg-white"}`}
    />
    <div className="text-sm font-bold">{label}</div>
    {/* 보기 버튼 */}
    {!isAll && (
      <button
        onClick={showSheet}
        className="text-xs border-[1.5px] border-[#6E7CF2] text-[#6E7CF2] px-2 py-1 font-bold ml-[40px] rounded-xl"
      >
        보기
      </button>
    )}
  </div>
);
