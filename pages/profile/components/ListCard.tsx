import { SettingIcon } from "@/pages/components/styles/Icons";

interface ListCardProps {
  getTime: string;
  content: string;
  plusMinus?: any;
  point?: string;
  status?: string;
  hasEdit?: boolean;
  surveyOwner?: string;
}

export const ListCard = ({
  getTime,
  content,
  plusMinus,
  point,
  status,
  hasEdit,
  surveyOwner,
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
          <div className="text-gray-9 font-semibold">
            {plusMinus}
            {point}
          </div>
        )}
        {status && (
          <div
            className={`font-medium text-xs text-gray-9 whitespace-nowrap ${
              status === "PROGRESS" && "text-primary-1"
            } ${
              status === "CLOSE" ||
              status === "DELETION" ||
              (status === "FORCED_DELETION" && "text-red-1")
            }`}
          >
            {status === "PAUSE" && "시작 전"}
            {status === "PROGRESS" && "진행중"}
            {status === "CLOSE" && "종료됨"}
            {status === "DELETION" && "삭제됨"}
            {status === "FORCED_DELETION" && "강제 삭제됨"}
          </div>
        )}
        {hasEdit && (
          <div className="cursor-pointer" onClick={() => {}}>
            <SettingIcon isSmall />
          </div>
        )}
        {surveyOwner && (
          <div className="flex items-center font-medium text-gray-9 text-xs whitespace-nowrap">
            {surveyOwner}
          </div>
        )}
      </div>
    </div>
  );
};
