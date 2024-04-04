import React from "react";
import { MultipleChoiceType } from "./AnswerType";
import { PlusIcon } from "@/pages/components/styles/Icons";

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
        <div key={index}>
          <MultipleChoiceType
            onMoveClick={() => {
              console.log("답변 이동");
            }}
            onDeleteClick={() => deleteChoice(index)}
            AnswerNumber={index + 1}
          />
        </div>
      ))}

      {/* 새 답변 추가 버튼 */}
      <button
        className="medium-Btn white-bg-primary-btn self-center w-auto mt-6"
        onClick={addChoice}
      >
        <div className="flex items-center gap-1">
          <PlusIcon /> 새 답변 추가
        </div>
      </button>
    </>
  );
};
