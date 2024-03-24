import { useState } from "react";
import SurveyCard from "../components/SurveyCard";
import { TabBar } from "../components/TabBar";
import { TopBar } from "../components/TopBar";
import { SearchIcon } from "../components/styles/Icons";

export default function Browse() {
  let SurveyList = ["ex1", "ex2", "ex3", "ex4", "ex5", "ex6"];
  const orderList = [
    "최신순",
    "높은 포인트순",
    "적은 문항수순",
    "많은 문항수순",
  ];
  const [showOrder, setShowOrder] = useState(false);

  const [orderType, setOrderType] = useState("높은 포인트순");
  const handleOrderSelect = (selectedOrderType: string) => {
    setOrderType(selectedOrderType);
    setShowOrder(false);
  };
  return (
    <>
      <TopBar
        title="설문 둘러보기"
        rightSVG={<SearchIcon />}
        onRightClick={() => {
          console.log("검색");
        }}
        hasSubTopBar={true}
        subTitle="전체"
        hasOrder={true}
        onOrderClick={() => {
          setShowOrder((prev) => !prev);
        }}
        showOrder={showOrder}
        orderList={orderList}
        orderType={orderType}
        onOrderSelect={handleOrderSelect}
      />

      <div className="screen">
        <div className="bg-[#F8F8F8] w-full h-screen pt-[120px] pb-[105px] px-6 gap-[6px] flex flex-col overflow-auto hide-scrollbar">
          {SurveyList.map((index) => (
            <SurveyCard
              key={index}
              category={"카테고리"}
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
            category={"카테고리"}
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
            category={"카테고리"}
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
      <TabBar />
    </>
  );
}
