interface MySurveyCardProps {
  category: string;
  title: string;
  onDeleteClick: () => void;
  onUpdateClick?: () => void;
  beforeStart?: boolean;
  onBlueBtnClick?: () => void;
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
  onBlueBtnClick,
  showResult,
}: MySurveyCardProps) => {
  return (
    <div className={`card ${showResult ? "bg-gray-1" : "bg-white"}`}>
      <div className="flex items-center w-full pb-1">
        <div className="text-gray-5 text-xs font-semibold">{category}</div>
      </div>
      <div className="text-gray-9 font-semibold pb-4">{title}</div>
      {beforeStart ? (
        <div className="flex gap-4 w-full">
          <div className="flex gap-2 w-full">
            <button
              onClick={onDeleteClick}
              className="small-Btn bg-white border-red-1 text-red-1"
            >
              삭제
            </button>

            <button
              onClick={onUpdateClick}
              className="small-Btn bg-white border-primary-1 text-primary-1"
            >
              수정
            </button>
          </div>

          <button
            onClick={onBlueBtnClick}
            className="medium-Btn w-full text-white border-primary-1 bg-primary-1"
          >
            설문 시작
          </button>
        </div>
      ) : beforeFinish ? (
        <div className="flex gap-4 w-full">
          <div className="flex gap-2 w-full">
            <button
              onClick={onDeleteClick}
              className="small-Btn bg-white border-red-1 text-red-1"
            >
              삭제
            </button>

            <button
              onClick={onUpdateClick}
              className="small-Btn bg-white border-primary-1 text-primary-1"
            >
              수정
            </button>
          </div>
          <button
            onClick={onBlueBtnClick}
            className="medium-Btn w-full text-white border-primary-1 bg-primary-1"
          >
            설문 종료
          </button>
        </div>
      ) : showResult ? (
        <div className="flex gap-4 w-full">
          <button
            onClick={onDeleteClick}
            className="small-Btn bg-white border-red-1 text-red-1"
          >
            삭제
          </button>
          <button
            onClick={onBlueBtnClick}
            className="medium-Btn w-full text-white border-primary-1 bg-primary-1"
          >
            결과 보기
          </button>
        </div>
      ) : null}
    </div>
  );
};
