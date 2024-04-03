import { useState } from "react";
import SurveyCard from "../components/SurveyCard";
import { TabBar } from "../components/TabBar";
import { TopBar } from "../components/TopBar";
import { SearchIcon } from "../components/styles/Icons";
import { Dialog } from "../components/Dialog";

export default function Browse() {
  let SurveyList = ["ex1", "ex2", "ex3", "ex4", "ex5", "ex6"];
  const categoryList = [
    "전체",
    "사회",
    "경제",
    "생활",
    "취미",
    "IT",
    "문화",
    "기타",
  ];
  const [showCategory, setShowCategory] = useState(false);
  const [categoryType, setCategoryType] = useState("전체");
  const handleCategorySelect = (selectedCategoryType: string) => {
    setCategoryType(selectedCategoryType);
    setShowCategory(false);
  };

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

  const [showAlertDialog, setShowAlertDialog] = useState(false);
  return (
    <>
      <TopBar
        title="설문 둘러보기"
        rightSVG={<SearchIcon />}
        onRightClick={() => {
          console.log("검색");
        }}
        hasSubTopBar={true} // 서브 탑바
        subTitle="전체"
        hasCategory={true} // 카테고리
        onCategoryClick={() => {
          setShowCategory((prev) => !prev);
        }}
        showCategory={showCategory}
        categoryList={categoryList}
        categoryType={categoryType}
        onCategorySelect={handleCategorySelect}
        hasOrder={true} // 정렬
        onOrderClick={() => {
          setShowOrder((prev) => !prev);
        }}
        showOrder={showOrder}
        orderList={orderList}
        orderType={orderType}
        onOrderSelect={handleOrderSelect}
      />

      <div className="screen">
        <div className="inner-screen">
          {SurveyList.map((index) => (
            <SurveyCard
              key={index}
              category={"카테고리"}
              title={`제목 2줄까지 제목 2줄까지 제목 2줄까지 제목 2줄까지 제목 2줄까지 제목 2줄까지`}
              nickname={`김치냉장고`}
              point={5}
              deadline={`2024년 3월 24일 12시`}
              onReportClick={() => {
                setShowAlertDialog((prev) => !prev);
              }}
              showDetail={() => {
                console.log("더보기");
              }}
            />
          ))}
        </div>
        {showAlertDialog && (
          <Dialog
            title="설문을 신고하시겠습니까?"
            hasTextarea={true}
            inputTitle="신고 사유"
            leftText="취소"
            onLeftClick={() => {
              setShowAlertDialog((prev) => !prev);
            }}
            rightText="신고"
            onRightClick={() => {
              console.log("신고");
            }}
            isDelete={true}
          />
        )}
      </div>
      <TabBar />
    </>
  );
}
