import { MyCheckBox } from "@/pages/components/MyCheckBox";
import { useState } from "react";

// 단답형
interface ShortAnswerProps {
  setCount: (value: number) => void;
}

export const ShortAnswerType = ({ setCount }: ShortAnswerProps) => {
  // 필수 답변 체크 박스
  const [isChecked, setIsChecked] = useState(false);
  const handleCheckboxChange = () => {
    setIsChecked((isChecked) => !isChecked);
  };
  return (
    <div className="flex justify-between gap-2 items-center pt-4">
      <MyCheckBox isChecked={isChecked} onCheckClick={handleCheckboxChange} />

      <div className="flex justify-between w-full items-center">
        <div className="sm-gray-9-text text-base">최대 글자수 제한</div>
        <input
          disabled={!isChecked}
          className="w-16 p-2 rounded-lg border-[1px] border-gray-4"
          onChange={(e) => setCount(parseInt(e.target.value, 10))}
        />
      </div>
    </div>
  );
};
