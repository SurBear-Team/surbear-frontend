import { useState } from "react";
import SurveyCard from "../components/SurveyCard";
import { TabBar } from "../components/TabBar";
import { TopBar } from "../components/TopBar";
import { SearchIcon } from "../components/styles/Icons";
import { Dialog } from "../components/Dialog";
import Detail from "./components/Detail";
import { IDummyData, categoryList, dummyData, orderList } from "./data";
import { AnimatePresence } from "framer-motion";

export default function Browse() {
  const [showCategory, setShowCategory] = useState(false);
  const [categoryType, setCategoryType] = useState("전체");
  const handleCategorySelect = (selectedCategoryType: string) => {
    setCategoryType(selectedCategoryType);
    setShowCategory(false);
  };

  const [showOrder, setShowOrder] = useState(false);
  const [orderType, setOrderType] = useState("높은 포인트순");
  const handleOrderSelect = (selectedOrderType: string) => {
    setOrderType(selectedOrderType);
    setShowOrder(false);
  };

  const [showAlertDialog, setShowAlertDialog] = useState(false);

  // 설문 정보 더보기 기능 관련
  const data = dummyData;
  const [showDetail, setShowDetail] = useState(false);
  const [detailId, setDetailId] = useState(0);
  const [detailData, setDetailData] = useState<IDummyData>();
  const showDetailClicked = (id: number) => {
    setDetailId(id);
    const [tempData] = data.filter((el) => el.id === id);
    setDetailData(tempData);
    setShowDetail(true);
  };

  console.log(showDetail);

  return (
    <>
      <TopBar
        title="설문 둘러보기"
        rightSVG={<SearchIcon />}
        onRightClick={() => {
          console.log("검색");
        }}
        hasShadow={true}
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
        <div className="list-screen">
          <AnimatePresence>
            {showDetail && (
              <Detail
                key={detailId}
                layoutId={detailId}
                data={detailData!}
                onBackClick={() => setShowDetail(false)}
              />
            )}
            <div className="list">
              {data.map((el) => (
                <SurveyCard
                  layoutId={el.id}
                  key={el.id}
                  data={el}
                  onReportClick={() => {
                    setShowAlertDialog((prev) => !prev);
                  }}
                  showDetail={() => showDetailClicked(el.id)}
                />
              ))}
            </div>
          </AnimatePresence>
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
