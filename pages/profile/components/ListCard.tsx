import { SettingIcon } from "@/pages/components/styles/Icons";

interface ListCardProps {
  getTime: any;
  content: string;
  plusMinus?: any;
  point?: string;
  status?: string;
  hasEdit?: boolean;
}

export const ListCard = ({
  getTime,
  content,
  plusMinus,
  point,
  status,
  hasEdit,
}: ListCardProps) => {
  return (
    <div className="w-full flex justify-between h-16 px-6 items-center bg-white border-b-[1px] border-gray-4">
      <div className="text-gray-9 text-sm font-semibold">{getTime}</div>
      <div className="flex items-center gap-2">
        <div className="sm-gray-text">{content}</div>
        {plusMinus && point && (
          <div className="text-gray-9 font-semibold">
            {plusMinus}
            {point}
          </div>
        )}
        {status && (
          <div
            className={`font-medium text-xs ${
              status === "PROGRESS" && "text-primary-1"
            }`}
          >
            {status === "PAUSE" && "시작 전"}
            {status === "PROGRESS" && "진행중"}
          </div>
        )}
        {hasEdit && (
          <div className="cursor-pointer" onClick={() => {}}>
            <SettingIcon isSmall />
          </div>
        )}
      </div>
    </div>
  );
};
