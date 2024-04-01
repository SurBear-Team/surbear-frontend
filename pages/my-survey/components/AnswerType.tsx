import { MinusIcon, TwoWayArrowIcon } from "@/pages/components/styles/Icons";

// 객관식
interface MultipleChoiceTypeProps {
  AnswerNumber: number;
  onMoveClick: () => void;
  onDeleteClick: () => void;
}

export const MultipleChoiceType = ({
  AnswerNumber,
  onMoveClick,
  onDeleteClick,
}: MultipleChoiceTypeProps) => {
  return (
    <>
      <div className="flex flex-col gap-1">
        <div className="sm-gray-9-text text-base pt-2">답변 {AnswerNumber}</div>
        <input
          className="main-input text-gray-9"
          placeholder="답변을 입력해주세요"
        />
        <div className="flex gap-2 justify-end">
          <div
            onClick={onMoveClick}
            className="flex items-center gap-1 cursor-pointer"
          >
            <TwoWayArrowIcon />
            <div className="text-green-1 font-semibold text-sm">답변 이동</div>
          </div>

          <div
            onClick={onDeleteClick}
            className="flex items-center gap-1 cursor-pointer"
          >
            <MinusIcon />
            <div className="text-red-1 font-semibold text-sm">답변 삭제</div>
          </div>
        </div>
      </div>
    </>
  );
};
