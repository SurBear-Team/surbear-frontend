import { ArrowBackIcon, ReportIcon } from "@/pages/components/styles/Icons";
import { IDummyData } from "../data";

interface IDetail {
  data: IDummyData;
  onBackClick: () => void;
}

export default function Detail({ data, onBackClick }: IDetail) {
  return (
    <div className="flex flex-col w-full h-full rounded-lg bg-white shadow-md pt-2 pb-4 px-4">
      {/* 상단 메뉴 */}
      <div className="flex justify-between items-center px-2 py-2">
        <div
          className="flex items-center gap-1 cursor-pointer"
          onClick={onBackClick}
        >
          <ArrowBackIcon isSmall={true} />
          <span className="sm-gray-9-text">뒤로가기</span>
        </div>
        <div className="flex items-center gap-1 cursor-pointer">
          <ReportIcon />
          <span className="font-semibold text-xs text-red-1">신고하기</span>
        </div>
      </div>
      <div className="gray-line mt-2 mb-4" />
      {/* 설문 정보 */}
      <div className="flex flex-col px-2 gap-2">
        <div className="flex flex-col gap-1">
          <div className="sm-gray-text">{data.category}</div>
          <div className="font-semibold text-base text-gray-9">
            {data.title}
          </div>
          <div className="flex flex-col sm-gray-text">
            <span>작성자 : {data.user}</span>
            <span>지급 포인트 : {data.point}pt</span>
            <span>총 문항 수 : {data.quesCount}개</span>
            <span>참여한 사람 : {data.userCount}명</span>
            <span>설문 시작일 : 년 월 일</span>
            <span>설문 마강 : 년 월 일 시</span>
          </div>
        </div>
      </div>
      <div className="gray-line mt-4" />
      {/* 본문 */}
      <div className="flex flex-grow relative font-semibold text-gray-9 text-base overflow-y-scroll hide-scrollbar">
        <div className="w-full px-2 py-4 absolute">{data.description}</div>
      </div>
      <div className="gray-line" />
      {/* 하단 버튼 */}
      <div className="px-2 pt-4">
        <button className="primary-btn-style long-button">시작하기</button>
      </div>
    </div>
  );
}
