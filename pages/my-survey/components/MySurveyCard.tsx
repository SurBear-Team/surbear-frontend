interface MySurveyCardProps {
  category: string;
  title: string;
  onDeleteClick: () => void;
  onUpdateClick?: () => void;
  beforeStart?: boolean;
  onStartClick?: () => void; // 설문 시작 버튼
  onFinishClick?: () => void; // 설문 종료 버튼
  onResultClick?: () => void; // 결과 보기 버튼
  beforeFinish?: boolean;
  showResult?: boolean;
}
export const MySurveyCard = ({
  category,
  title,
  beforeStart,
  beforeFinish,
  onDeleteClick,
  onUpdateClick,
  onStartClick,
  onFinishClick,
  onResultClick,
  showResult,
}: MySurveyCardProps) => {
  return (
    <div className={`card ${showResult ? "bg-gray-1" : "bg-white"}`}>
      <div className="flex items-center w-full pb-1">
        <div className="sm-gray-text">{category}</div>
      </div>
      <div className="text-gray-9 font-semibold pb-4">{title}</div>
      <div className="flex gap-4 w-full">
        <div className="flex gap-2 w-full">
          <button
            onClick={onDeleteClick}
            className="long-button bg-white border-red-1 text-red-1"
          >
            삭제
          </button>
          {beforeStart && (
            <button
              onClick={onUpdateClick}
              className="long-button bg-white border-primary-1 text-primary-1"
            >
              수정
            </button>
          )}
        </div>
        {beforeStart && (
          <button
            onClick={onStartClick}
            className="long-button w-full primary-btn-style"
          >
            설문 시작
          </button>
        )}
        {beforeFinish && (
          <button
            onClick={onFinishClick}
            className="long-button w-full primary-btn-style"
          >
            설문 종료
          </button>
        )}
        {showResult && (
          <button
            onClick={onResultClick}
            className="long-button primary-btn-style"
          >
            결과 보기
          </button>
        )}
      </div>
    </div>
  );
};
