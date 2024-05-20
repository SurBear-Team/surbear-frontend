import { useEffect } from "react";
import { ISurvey, category } from "../browse/data";
import { getTime } from "../utils";
import { ReportIcon } from "./styles/Icons";
import { motion } from "framer-motion";

interface SurveyCardProps {
  layoutId: number;
  token?: number | null;
  data: ISurvey;
  isFinished?: boolean;
  onReportClick?: () => void;
  showDetail?: () => void;
}

export default function SurveyCard({
  layoutId,
  token,
  data,
  isFinished,
  onReportClick,
  showDetail,
}: SurveyCardProps) {
  const { year, month, date, hour, minute } = getTime(data.deadLine);
  const [{ key, value }] = category.filter((el) => el.key === data.surveyType);
  useEffect(() => {}, []);

  return (
    <>
      <motion.div
        layoutId={layoutId + ""}
        className={`card ${isFinished ? "bg-gray-1" : "bg-white"}`}
      >
        <div className="flex justify-between items-center w-full pb-2">
          <div className="sm-gray-text">{value}</div>
          {token !== data.surveyAuthorId && (
            <div
              onClick={onReportClick}
              className="text-red-1 flex items-center gap-1 text-[10px] cursor-pointer"
            >
              <ReportIcon />
              신고
            </div>
          )}
        </div>
        <div className="base-gray-9-text pb-2">{data.title}</div>

        <>
          <div className="sm-gray-text">
            <div>지급 포인트 : {data.point} pt</div>
            <div>
              설문 마감 : {year}년 {month}월 {date}일 {hour}시 {minute}분까지
            </div>
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
