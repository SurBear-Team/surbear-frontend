import { IDummyData } from "../browse/data";
import { ReportIcon } from "./styles/Icons";
import { motion } from "framer-motion";

interface SurveyCardProps {
  layoutId: number;
  data: IDummyData;
  isFinished?: boolean;
  onReportClick?: () => void;
  showDetail?: () => void;
}

export default function SurveyCard({
  layoutId,
  data,
  isFinished,
  onReportClick,
  showDetail,
}: SurveyCardProps) {
  return (
    <>
      <motion.div
        layoutId={layoutId + ""}
        className={`card ${isFinished ? "bg-gray-1" : "bg-white"}`}
      >
        <div className="flex justify-between items-center w-full pb-2">
          <div className="sm-gray-text">{data.category}</div>
          <div
            onClick={onReportClick}
            className="text-red-1 flex items-center gap-1 text-[10px] cursor-pointer"
          >
            <ReportIcon />
            신고
          </div>
        </div>
        <div className="text-gray-9 font-semibold pb-2">{data.title}</div>

        <>
          <div className="sm-gray-text">
            <div>작성자 : {data.user}</div>
            <div>지급 포인트 : {data.point} pt</div>
            <div>설문 마감 : {data.deadline}</div>
          </div>
          <div
            onClick={showDetail}
            className="long-button primary-btn-style mt-4 flex justify-center"
          >
            더보기
          </div>
        </>
      </motion.div>
    </>
  );
}
