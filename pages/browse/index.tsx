import { useEffect, useState } from "react";
import SurveyCard from "../components/SurveyCard";
import { TabBar } from "../components/TabBar";
import { Dialog } from "../components/Dialog";
import Detail from "./components/Detail";
import { ISurvey, category, orderList } from "./data";
import { AnimatePresence } from "framer-motion";
import { TopBar } from "../components/TopBar/TopBar";
import Pagination from "./components/Pagination";
import api from "../api/config";
import { useRecoilState } from "recoil";
import { categoryTypeAtom } from "../atoms";

export default function Browse() {
  const [data, setData] = useState<ISurvey[]>();

  // 페이지네이션
  const [currentPage, setCurrentPage] = useState(0);
  const [lastPage, setLastPage] = useState(0);
  const CARD_PER_PAGE = 10;
  const onPrevClick = () => {
    currentPage <= 0 ? setCurrentPage(0) : setCurrentPage((prev) => prev - 1);
  };
  const onNextClick = () => {
    currentPage >= lastPage - 1
      ? setCurrentPage(lastPage - 1)
      : setCurrentPage((prev) => prev + 1);
  };
  const onNumClick = (el: number) => {
    setCurrentPage(el - 1);
  };

  useEffect(() => {
    api
      .get(`/survey/management/${currentPage}/${CARD_PER_PAGE}`)
      .then((res) => {
        setData(res.data.content);
        setLastPage(res.data.totalPages);
      })
      .catch((err) => console.log(err));
  }, [currentPage]);

  const [categoryType, setCategoryType] = useRecoilState(categoryTypeAtom);
  useEffect(() => {
    setCategoryType("ALL");
  }, []);

  const [orderType, setOrderType] = useState("최신순");
  const handleOrderSelect = (selectedOrderType: string) => {
    setOrderType(selectedOrderType);
  };

  const [showAlertDialog, setShowAlertDialog] = useState(false);

  // 설문 정보 더보기 기능 관련
  const [showDetail, setShowDetail] = useState(false);
  const [detailId, setDetailId] = useState(0);
  const [detailData, setDetailData] = useState<ISurvey>();
  const showDetailclick = (id: number) => {
    setDetailId(id);
    const [tempData] = data!.filter((el) => el.id === id);
    setDetailData(tempData);
    setShowDetail(true);
  };

  return (
    <>
      <TopBar
        title="설문 둘러보기"
        hasSearch
        subTitle="전체"
        categoryList={category.map((el) => el.value)}
        categoryType={categoryType}
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
              {data?.map((el) => (
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
        currentPage={currentPage + 1}
        lastPage={lastPage}
        onPrevClick={onPrevClick}
        onNextClick={onNextClick}
        onNumClick={onNumClick}
      />
      <TabBar />
    </>
  );
}
