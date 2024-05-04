import { MyCheckBox } from "@/pages/components/MyCheckBox";
import { useEffect, useState } from "react";

// 단답형
interface ShortAnswerProps {
  setCount: (value: number) => void;
  hasLimit?: boolean;
  value?: number;
}

export const ShortAnswerType = ({
  setCount,
  hasLimit,
  value,
}: ShortAnswerProps) => {
  // 필수 답변 체크 박스
  const [isChecked, setIsChecked] = useState(false);
  const [isLimited, setIsLimited] = useState(hasLimit);
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    if (!isLimited) {
      setInputValue(788183);
      setCount(788183);
    }
  }, [isLimited]);

  const handleCheckboxChange = () => {
    if (hasLimit) {
      setIsLimited((hasLimit) => !hasLimit);
    } else {
      setIsChecked((isChecked) => !isChecked);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value, 10);

    if (!isNaN(newValue)) {
      setCount(newValue);
      setInputValue(newValue);
    }
  };
  return (
    <div className="flex justify-between gap-2 items-center pt-4">
      <MyCheckBox
        isChecked={isLimited ? isLimited : isChecked}
        onCheckClick={handleCheckboxChange}
      />

      <div className="flex justify-between w-full items-center">
        <div className="sm-gray-9-text text-base">최대 글자수 제한</div>
        <input
          type="number"
          value={inputValue === 788183 ? "" : inputValue}
          disabled={!isChecked && !isLimited}
          className="w-16 p-2 rounded-lg border-[1px] border-gray-4"
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
};
