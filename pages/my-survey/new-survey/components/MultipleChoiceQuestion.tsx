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
  isEdit?: boolean;
}

export const MultipleChoiceQuestion: React.FC<MultipleChoiceQuestionProps> = ({
  choices,
  addChoice,
  deleteChoice,
  handleChoiceChange,
  isEdit,
}) => {
  const [orderChangeVisible, setOrderChangeVisible] = useState(false);
  const [originalChoices, setOriginalChoices] = useState([...choices]);

  // 답변 순서 위로 이동
  const handleOrderUp = (index: number) => {
    // 첫 번째 답변이 아닌 경우
    if (index > 0) {
      // 현재 답변들을 복사해 새로운 배열 생성
      let newChoices = [...choices];
      [newChoices[index - 1], newChoices[index]] = [
        newChoices[index],
        newChoices[index - 1],
      ]; // 선택한 답변과 바로 위 답변을 스왑
      newChoices.forEach((choice, i) => handleChoiceChange(i, choice));
      // 변경된 답변 배열로 업데이트
    }
  };

  // 답변 순서를 아래로 이동
  const handleOrderDown = (index: number) => {
    // 마지막 답변이 아닌 경우
    if (index < choices.length - 1) {
      // 현재 답변들을 복사해 새로운 배열 생성
      let newChoices = [...choices];
      [newChoices[index], newChoices[index + 1]] = [
        newChoices[index + 1],
        newChoices[index],
      ]; // 선택한 답변과 바로 아래 답변을 스왑
      newChoices.forEach((choice, i) => handleChoiceChange(i, choice));
      // 변경된 답변 배열로 업데이트
    }
  };

  const showOrderChangeModal = () => {
    // 현재 답변 상태를 복사하여 저장
    setOriginalChoices([...choices]);
    setOrderChangeVisible(true);
  };

  const handleCancelOrderChange = () => {
    // 원래 배열에 저장된 순서를 사용해 복구
    originalChoices.forEach((choice, i) => handleChoiceChange(i, choice));
    setOrderChangeVisible(false);
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
            {isEdit && (
              <div
                onClick={showOrderChangeModal}
                className="flex items-center gap-1 cursor-pointer"
              >
                <TwoWayArrowIcon />
                <div className="text-green-1 font-semibold text-sm">
                  답변 이동
                </div>
              </div>
            )}

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

      {/* 답변 순서 변경 */}
      <div className="flex fixed top-1/3 left-1/2 justify-center z-50">
        {orderChangeVisible && (
          <OrderChangeCard
            orderTitle="답변 순서 변경"
            orderContents={choices}
            onOrderUpClick={handleOrderUp}
            onOrderDownClick={handleOrderDown}
            onCancleClick={handleCancelOrderChange}
            onMoveClick={() => setOrderChangeVisible(false)}
          />
        )}
      </div>
    </>
  );
};
