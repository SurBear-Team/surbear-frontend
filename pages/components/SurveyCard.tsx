import { ReportIcon } from "./styles/Icons";

export default function SurveyCard({ title, nickname, point }: any) {
  return (
    <>
      <div className="bg-white flex p-6 flex-col items-start rounded-lg shadow-md">
        <div className="flex justify-between items-center w-full pb-2">
          <div className="text-gray-5 text-xs font-semibold">카테고리</div>
          <div
            onClick={() => {
              console.log("신고");
            }}
            className="text-red-1 flex items-center gap-1 text-[10px] cursor-pointer"
          >
            <ReportIcon />
            신고
          </div>
        </div>
        <div className="text-gray-9 font-semibold pb-2">{title}</div>

        <div className="text-gray-5 text-xs font-semibold">
          <div>작성자 : {nickname}</div>
          <div>지급 포인트 : {point} pt</div>
        </div>

        <div className="long-button bg-primary-1 text-white mt-4 flex justify-center">
          더보기
        </div>
      </div>
    </>
  );
}
