import { ReportIcon } from "./styles/Icons";

interface SurveyCardProps {
  category: string;
  title: string;
  nickname?: string;
  point?: number;
  deadline?: string;
  ismine?: boolean; // 이게 true면 삭제 수정 설문시작 버튼으로
  isFinished?: boolean;
  onReportClick?: () => void;
  showDetail?: () => void;
  onDeleteClick?: () => void;
  onUpdateClick?: () => void;
  onStartClick?: () => void;
  showResult?: () => void;
}

export default function SurveyCard({
  category,
  title,
  nickname,
  point,
  deadline,
  ismine,
  isFinished,
  onReportClick,
  showDetail,
  onDeleteClick,
  onUpdateClick,
  onStartClick,
  showResult,
}: SurveyCardProps) {
  return (
    <>
      <div className={`card ${isFinished ? "bg-gray-1" : "bg-white"}`}>
        <div className="flex justify-between items-center w-full pb-2">
          <div className="text-gray-5 text-xs font-semibold">{category}</div>
          {!ismine && (
            <div
              onClick={onReportClick}
              className="text-red-1 flex items-center gap-1 text-[10px] cursor-pointer"
            >
              <ReportIcon />
              신고
            </div>
          )}
        </div>
        <div className="text-gray-9 font-semibold pb-2">{title}</div>

        {!ismine ? (
          <>
            <div className="text-gray-5 text-xs font-semibold">
              <div>작성자 : {nickname}</div>
              <div>지급 포인트 : {point} pt</div>
              <div>설문 마감 : {deadline}</div>
            </div>
            <div
              onClick={showDetail}
              className="long-button bg-primary-1 text-white mt-4 flex justify-center"
            >
              더보기
            </div>
          </>
        ) : (
          <div className="flex gap-4 w-full pt-4">
            <div className="flex gap-2 w-full">
              <button
                onClick={onDeleteClick}
                className="small-Btn bg-white border-red-1 text-red-1"
              >
                삭제
              </button>
              {!isFinished && (
                <button
                  onClick={onUpdateClick}
                  className="small-Btn bg-white border-primary-1 text-primary-1"
                >
                  수정
                </button>
              )}
            </div>
            <button
              onClick={isFinished ? showResult : onStartClick}
              className="medium-Btn w-full text-white  border-primary-1 bg-primary-1"
            >
              {isFinished ? "결과 보기" : "설문 시작"}
            </button>
          </div>
        )}
      </div>
    </>
  );
}
