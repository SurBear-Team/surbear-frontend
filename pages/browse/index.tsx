import SurveyCard from "../components/SurveyCard";
import { TabBar } from "../components/TabBar";
import { TopBar } from "../components/TopBar";
import { SearchIcon } from "../components/styles/Icons";

export default function Explore() {
  let SurveyList = ["ex1", "ex2", "ex3", "ex4", "ex5", "ex6"];
  return (
    <>
      <TopBar
        title="설문 둘러보기"
        rightSVG={<SearchIcon />}
        hasSubTopBar={true}
        hasFilter={true}
        onFilterClick={() => {
          console.log("필터 클릭");
        }}
        hasOrder={true}
        onOrderClick={() => {
          console.log("정렬 클릭");
        }}
        orderType="최신순"
      />
      <div className="text-white">
        <div className="screen">
          <div className="bg-[#F8F8F8] w-full h-screen pt-[120px] pb-[105px] px-6 gap-[6px] flex flex-col overflow-auto hide-scrollbar">
            {SurveyList.map((index) => (
              <SurveyCard
                key={index}
                title={`제목 2줄까지 제목 2줄까지 제목 2줄까지 제목 2줄까지 제목 2줄까지 제목 2줄까지`}
                nickname={`김치냉장고`}
                point={5}
                onReportClick={() => {
                  console.log("신고하기");
                }}
                showDetail={() => {
                  console.log("더보기");
                }}
              />
            ))}
            <SurveyCard
              title={`제목 2줄까지`}
              ismine={true}
              onDeleteClick={() => {
                console.log("삭제");
              }}
              onUpdateClick={() => {
                console.log("수정");
              }}
              onStartClick={() => {
                console.log("설문 시작");
              }}
            />
            <SurveyCard
              title={`제목 2줄까지`}
              ismine={true}
              isFinished={true}
              onDeleteClick={() => {
                console.log("삭제");
              }}
              showResult={() => {
                console.log("결과 보기");
              }}
            />
          </div>
        </div>
      </div>
      <TabBar />
    </>
  );
}
