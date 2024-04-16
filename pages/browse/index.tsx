import { useState } from "react";
import SurveyCard from "../components/SurveyCard";
import { TabBar } from "../components/TabBar";
import { Dialog } from "../components/Dialog";
import Detail from "./components/Detail";
import { IDummyData, categoryList, dummyData, orderList } from "./data";
import { AnimatePresence } from "framer-motion";
import { TopBar } from "../components/TopBar/TopBar";
import Pagination from "./components/Pagination";

export default function Browse() {
  const [categoryType, setCategoryType] = useState("전체");
  const handleCategorySelect = (selectedCategoryType: string) => {
    setCategoryType(selectedCategoryType);
  };

  const [orderType, setOrderType] = useState("최신순");
  const handleOrderSelect = (selectedOrderType: string) => {
    setOrderType(selectedOrderType);
  };

  const [showAlertDialog, setShowAlertDialog] = useState(false);

  // 설문 정보 더보기 기능 관련
  const data = dummyData;
  const [showDetail, setShowDetail] = useState(false);
  const [detailId, setDetailId] = useState(0);
  const [detailData, setDetailData] = useState<IDummyData>();
  const showDetailclick = (id: number) => {
    setDetailId(id);
    const [tempData] = data.filter((el) => el.id === id);
    setDetailData(tempData);
    setShowDetail(true);
  };

  // 페이지네이션
  const last = Math.ceil(data.length / 10);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(last);
  const onPrevClick = () => {
    currentPage <= 1 ? setCurrentPage(1) : setCurrentPage((prev) => prev - 1);
  };
  const onNextClick = () => {
    currentPage >= lastPage
      ? setCurrentPage(lastPage)
      : setCurrentPage((prev) => prev + 1);
  };
  const onNumClick = (el: number) => {
    setCurrentPage(el);
  };

  const CARD_PER_PAGE = 10;
  const startPoint = (currentPage - 1) * CARD_PER_PAGE;
  const list = data.slice(startPoint, startPoint + CARD_PER_PAGE);

  return (
    <>
      <TopBar
        title="설문 둘러보기"
        hasSearch
        subTitle="전체"
        categoryList={categoryList}
        categoryType={categoryType}
        onCategorySelect={(selected: string) => handleCategorySelect(selected)}
        orderList={orderList}
        orderType={orderType}
        onOrderSelect={(selected: string) => handleOrderSelect(selected)}
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
              {list.map((el) => (
                <SurveyCard
                  layoutId={el.id}
                  key={el.id}
                  data={el}
                  onReportClick={() => {
                    setShowAlertDialog((prev) => !prev);
                  }}
                  showDetail={() => showDetailclick(el.id)}
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
      <Pagination
        currentPage={currentPage}
        lastPage={lastPage}
        onPrevClick={onPrevClick}
        onNextClick={onNextClick}
        onNumClick={onNumClick}
      />
      <TabBar />
    </>
  );
}
