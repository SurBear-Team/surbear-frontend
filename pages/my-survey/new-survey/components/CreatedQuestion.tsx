import { engToKorTypeMapping } from "../../components/typeMapping";

interface CreatedQuestionProps {
  answerIndex: number;
  type: string;
  title: string;
  answerList?: string[];
  count?: number;
  onEdit: () => void;
  onDelete: () => void;
}

export const CreatedQuestion = ({
  answerIndex,
  type,
  title,
  answerList,
  count,
  onEdit,
  onDelete,
}: CreatedQuestionProps) => {
  return (
    <div className="px-6 w-full">
      {/* 질문제목 */}
      <div className="flex pb-2">
        <div className="sm-gray-9-text text-base pr-2">{`${answerIndex}.`}</div>
        <div className="sm-gray-9-text text-base">{title}</div>
      </div>
      <div className="pb-6 sm-gray-9-text">{engToKorTypeMapping[type]}</div>

      {/* 질문답변 */}
      {answerList?.map((answer: string, index: number) => (
        <div
          key={index}
          className="flex w-full p-2 mb-4 items-center gap-3 border-[1px] border-gray-4 rounded-lg"
        >
          <div
            className={`${
              type === "MULTIPLE_CHOICE" ? "check-box" : "w-4 h-4 rounded-full"
            } bg-white border-[1px] border-gray-7 min-w-4`}
          />
          <div className="sm-gray-9-text font-normal">{answer}</div>
        </div>
      ))}
      {(type === "SHORT_ANSWER" || type === "SUBJECTIVE") && count && (
        <div>최대 글자수: {count === 788183 ? "제한 없음" : count}</div>
      )}
      {/* 수정 삭제 버튼 */}
      <div className="flex gap-2 justify-end">
        <button onClick={onEdit} className="small-Btn white-bg-primary-btn">
          수정
        </button>
        <button
          onClick={onDelete}
          className="small-Btn border-red-1 bg-red-1 text-white"
        >
          삭제
        </button>
      </div>

      <div className="gray-line mt-4 mb-10" />
    </div>
  );
};
