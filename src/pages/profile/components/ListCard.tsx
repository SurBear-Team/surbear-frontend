import { BanIcon } from "@/pages/components/styles/Icons";

interface ListCardProps {
  getTime?: string;
  content: string;
  plusMinus?: "+" | "-";
  point?: string;
  status?: string;
  hasBan?: boolean;
  onBanClick?: () => void;
  openType?: boolean;
  surveyOwner?: string;
  hasCancel?: boolean;
  onCancelClick?: () => void;
  viewResult?: () => void;
}

export const ListCard = ({
  getTime,
  content,
  plusMinus,
  point,
  status,
  hasBan,
  onBanClick,
  openType,
  surveyOwner,
  hasCancel,
  onCancelClick,
  viewResult,
}: ListCardProps) => {
  return (
    <div className="w-full flex gap-2 justify-between h-16 px-6 items-center bg-white border-b-[1px] border-gray-4">
      <div className="text-gray-9 text-sm font-semibold whitespace-nowrap">
        {getTime !== "" ? getTime : "시작 전"}
      </div>
      <div className="flex items-center gap-2 flex-grow overflow-hidden">
        <div className="w-full sm-gray-text text-ellipsis whitespace-nowrap overflow-hidden">
          {content}
        </div>
        {plusMinus && point && (
          <div
            className={`text-gray-9 font-semibold whitespace-nowrap ${
              plusMinus === "+" ? "text-primary-1" : "text-red-1"
            }`}
          >
            {`${plusMinus} ${point}`}
          </div>
        )}
        {status && (
          <div
            className={`font-medium text-xs text-gray-9 whitespace-nowrap ${
              status === "PROGRESS" && "text-primary-1"
            } ${
              status === "CLOSE" ||
              ((status === "DELETION" || status === "FORCED_DELETION") &&
                "text-red-1")
            }`}
          >
            {status === "PAUSE" && "시작 전"}
            {status === "PROGRESS" && "진행중"}
            {status === "CLOSE" && "종료됨"}
            {status === "DELETION" && "삭제됨"}
            {status === "FORCED_DELETION" && "강제 삭제됨"}
          </div>
        )}
        {hasBan && (
          <div onClick={onBanClick} className="cursor-pointer">
            <BanIcon />
          </div>
        )}
        {openType !== undefined && (
          <div className="flex items-center">
            {openType === true ? (
              <button
                onClick={viewResult}
                className="small-Btn primary-btn-style text-sm font-bold whitespace-nowrap"
              >
                결과 보기
              </button>
            ) : (
              <span className="font-bold text-xs text-gray-5 px-4 whitespace-nowrap">
                결과 비공개
              </span>
            )}
          </div>
        )}
        {surveyOwner && (
          <div className="flex items-center font-medium text-gray-9 text-xs whitespace-nowrap">
            {surveyOwner}
          </div>
        )}
        {hasCancel && (
          <div
            onClick={onCancelClick}
            className="rounded-full border border-red-1 px-2 py-1 whitespace-nowrap text-xs font-semibold text-red-1 cursor-pointer"
          >
            취소
          </div>
        )}
      </div>
    </div>
  );
};
