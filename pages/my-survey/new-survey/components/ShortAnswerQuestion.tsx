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
  const [isLimited, setIsLimited] = useState(hasLimit); // 수정하기로 전달받는거
  const [inputValue, setInputValue] = useState(value ? value.toString() : "");

  useEffect(() => {
    if (!isLimited) {
      setInputValue("788183");
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
    const newValue = e.target.value;
    setInputValue(newValue); // 직접 상태에 저장하지 않고 유효성 검증을 먼저 수행
  };

  const handleInputBlur = () => {
    const value = parseInt(inputValue, 10);
    if (!isNaN(value) && value >= 1) {
      setCount(value); // 입력 값이 1 이상의 정수일 경우 상태 업데이트
    } else {
      setInputValue(""); // 유효하지 않은 입력을 초기화
    }
  };

  return (
    <div className="flex justify-between gap-2 items-center pt-4">
      <MyCheckBox
        isChecked={isLimited ? isLimited : isChecked}
        onCheckClick={handleCheckboxChange}
      />

      <div className="flex justify-between w-full items-center">
        <div className="base-gray-9-text">최대 글자수 제한</div>
        <input
          type="number"
          value={inputValue === "788183" ? "" : inputValue}
          disabled={!isChecked && !isLimited}
          className="w-16 p-2 rounded-lg border-[1px] border-gray-4"
          onChange={handleInputChange}
          onBlur={handleInputBlur}
        />
      </div>
    </div>
  );
};
