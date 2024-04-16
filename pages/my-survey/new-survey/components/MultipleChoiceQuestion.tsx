import React, { useState } from "react";
import {
  MinusIcon,
  PlusIcon,
  TwoWayArrowIcon,
} from "@/pages/components/styles/Icons";
import { OrderChangeCard } from "../../components/OrderChangeCard";

interface MultipleChoiceQuestionProps {
  choices: string[];
  addChoice: () => void;
  deleteChoice: (index: number) => void;
  handleChoiceChange: (index: number, newText: string) => void;
}

export const MultipleChoiceQuestion: React.FC<MultipleChoiceQuestionProps> = ({
  choices,
  addChoice,
  deleteChoice,
  handleChoiceChange,
}) => {
  const [orderChangeVisible, setOrderChangeVisible] = useState(false);

  const handleOrderUp = (index: number) => {
    if (index > 0) {
      let newChoices = [...choices];
      [newChoices[index - 1], newChoices[index]] = [
        newChoices[index],
        newChoices[index - 1],
      ];
      newChoices.forEach((choice, i) => handleChoiceChange(i, choice));
    }
  };

  const handleOrderDown = (index: number) => {
    if (index < choices.length - 1) {
      let newChoices = [...choices];
      [newChoices[index], newChoices[index + 1]] = [
        newChoices[index + 1],
        newChoices[index],
      ];
      newChoices.forEach((choice, i) => handleChoiceChange(i, choice));
    }
  };

  return (
    <>
      {/* 답변들 */}
      {choices?.map((choice, index) => (
        <div key={index} className="flex flex-col gap-1">
          <div className="sm-gray-9-text text-base pt-2">답변 {index + 1}</div>
          <input
            className="main-input text-gray-9"
            value={choice}
            onChange={(e) => handleChoiceChange(index, e.target.value)}
            placeholder="답변을 입력해주세요"
          />
          <div className="flex gap-2 justify-end">
            <div
              onClick={() => {
                setOrderChangeVisible(true);
              }}
              className="flex items-center gap-1 cursor-pointer"
            >
              <TwoWayArrowIcon />
              <div className="text-green-1 font-semibold text-sm">
                답변 이동
              </div>
            </div>

            <div
              onClick={() => deleteChoice(index)}
              className="flex items-center gap-1 cursor-pointer"
            >
              <MinusIcon />
              <div className="text-red-1 font-semibold text-sm">답변 삭제</div>
            </div>
          </div>
        </div>
      ))}

      {/* 새 답변 추가 버튼 */}
      <button
        className="medium-Btn white-bg-primary-btn self-center w-auto mt-6 flex items-center gap-1"
        onClick={addChoice}
      >
        <PlusIcon /> 새 답변 추가
      </button>

      {orderChangeVisible && (
        <OrderChangeCard
          orderTitle="답변 순서 변경"
          orderContents={choices}
          onOrderUpClick={handleOrderUp}
          onOrderDownClick={handleOrderDown}
          onCancleClick={() => setOrderChangeVisible(false)}
          onMoveClick={() => setOrderChangeVisible(false)}
        />
      )}
    </>
  );
};
