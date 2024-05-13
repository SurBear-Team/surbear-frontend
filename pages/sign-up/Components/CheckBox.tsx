import { MyCheckBox } from "@/pages/components/MyCheckBox";

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
  <div
    className="flex w-full cursor-pointer justify-between items-center gap-4 py-[22px]"
    onClick={onClick}
  >
    <div className="flex gap-4 items-center">
      <MyCheckBox isChecked={inputChecked} onCheckClick={() => {}} />
      <div className="text-sm font-normal mt-[2px]">{label}</div>
    </div>
    {/* 보기 버튼 */}
    {!isAll && (
      <button
        onClick={showSheet}
        className="flex flex-shrink-0 text-xs border border-[#6E7CF2] text-[#6E7CF2] px-2 py-1 font-bold ml-[14px] rounded-2xl"
      >
        보기
      </button>
    )}
  </div>
);
