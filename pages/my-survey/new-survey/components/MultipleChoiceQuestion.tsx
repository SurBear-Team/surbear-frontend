import React from "react";
import {
  MinusIcon,
  PlusIcon,
  TwoWayArrowIcon,
} from "@/pages/components/styles/Icons";

interface MultipleChoiceQuestionProps {
  choices: any[];
  addChoice: () => void;
  deleteChoice: (index: number) => void;
}

export const MultipleChoiceQuestion: React.FC<MultipleChoiceQuestionProps> = ({
  choices,
  addChoice,
  deleteChoice,
}) => {
  return (
    <>
      {/* 답변들 */}
      {choices.map((_, index) => (
        <div key={index} className="flex flex-col gap-1">
          <div className="sm-gray-9-text text-base pt-2">답변 {index + 1}</div>
          <input
            className="main-input text-gray-9"
            placeholder="답변을 입력해주세요"
          />
          <div className="flex gap-2 justify-end">
            <div
              onClick={() => {
                console.log("답변 이동");
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
    </>
  );
};
