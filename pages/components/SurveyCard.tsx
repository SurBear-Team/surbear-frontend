import { ReportIcon } from "./styles/Icons";

interface SurveyCardProps {
  category: string;
  title: string;
  nickname?: string;
  point?: number;
  deadline?: string;
  isFinished?: boolean;
  onReportClick?: () => void;
  showDetail?: () => void;
}

export default function SurveyCard({
  category,
  title,
  nickname,
  point,
  deadline,
  isFinished,
  onReportClick,
  showDetail,
}: SurveyCardProps) {
  return (
    <>
      <div className={`card ${isFinished ? "bg-gray-1" : "bg-white"}`}>
        <div className="flex justify-between items-center w-full pb-2">
          <div className="sm-gray-text">{category}</div>
          <div
            onClick={onReportClick}
            className="text-red-1 flex items-center gap-1 text-[10px] cursor-pointer"
          >
            <ReportIcon />
            신고
          </div>
        </div>
        <div className="text-gray-9 font-semibold pb-2">{title}</div>

        <>
          <div className="sm-gray-text">
            <div>작성자 : {nickname}</div>
            <div>지급 포인트 : {point} pt</div>
            <div>설문 마감 : {deadline}</div>
          </div>
          <div
            onClick={showDetail}
            className="long-button primary-btn-style mt-4 flex justify-center"
          >
            더보기
          </div>
        </>
      </div>
    </>
  );
}
