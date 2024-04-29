import { SmallCheckIcon } from "./styles/Icons";

interface CheckBoxProps {
  isChecked: boolean;
  onCheckClick: () => void;
}

export const MyCheckBox: React.FC<CheckBoxProps> = ({
  isChecked,
  onCheckClick,
}) => {
  return (
    <div
      onClick={onCheckClick}
      className={`check-box ${
        isChecked ? "bg-[#6E7CF2]" : "bg-white border border-gray-7"
      }`}
    >
      {isChecked && <SmallCheckIcon />}
    </div>
  );
};
