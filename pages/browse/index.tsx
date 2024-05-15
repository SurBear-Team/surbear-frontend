import { useEffect, useState } from "react";
import SurveyCard from "../components/SurveyCard";
import { TabBar } from "../components/TabBar";
import { Dialog } from "../components/Dialog";
import Detail from "./components/Detail";
import { ISurvey } from "./data";
import { AnimatePresence } from "framer-motion";
import { TopBar } from "../components/TopBar/TopBar";
import Pagination from "./components/Pagination";
import api from "../api/config";
import { useRecoilState } from "recoil";
import { categoryTypeAtom } from "../atoms";
import { jwtDecode, JwtPayload } from "jwt-decode";

export default function Browse() {
  const [data, setData] = useState<ISurvey[]>();

  // 유저 토큰
  const [token, setToken] = useState<number | null>(null);
  useEffect(() => {
    if (typeof window !== undefined) {
      const storedToken = localStorage.getItem("surbearToken");
      if (storedToken) {
        const decoded = jwtDecode<JwtPayload>(storedToken);
        if (decoded && decoded.sub) {
          setToken(parseInt(decoded.sub));
        }
      }
    }
  }, []);

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

  const [categoryType, setCategoryType] = useRecoilState(categoryTypeAtom);

  const [orderType, setOrderType] = useState("최신순");
  const handleOrderSelect = (selectedOrderType: string) => {
    setOrderType(selectedOrderType);
  };

  useEffect(() => {
    if (categoryType !== "") {
      api
        .get(
          `/survey/management/${currentPage}/${CARD_PER_PAGE}?type=${categoryType}`
        )
        .then((res) => {
          const getTime = new Date().toISOString().slice(0, 19) + "Z";
          const original = res.data.content;
          const filtered = original.filter(
            (el: ISurvey) => el.deadLine > getTime
          );
          setData(filtered);
          setLastPage(res.data.totalPages);
        })
        .catch((err) => console.log(err));
    }
  }, [currentPage, categoryType]);

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

  const [reportedId, setReportedId] = useState<number | null>(null);

  return (
    <>
      <TopBar
        title="설문 둘러보기"
        subTitle="전체"
        hasCategory
        onOrderSelect={(selected: string) => handleOrderSelect(selected)}
      />

      <div className="screen">
        <div className="list-screen">
          <AnimatePresence>
            {showDetail && (
              <Detail
                key={detailId}
                token={token}
                layoutId={detailId}
                data={detailData!}
                onReportClick={() => {
                  setShowAlertDialog((prev) => !prev);
                  setReportedId(detailId);
                }}
                onBackClick={() => setShowDetail(false)}
              />
            )}
            <div className="list">
              {data?.map((el) => (
                <SurveyCard
                  layoutId={el.id}
                  key={el.id}
                  token={token}
                  data={el}
                  onReportClick={() => {
                    setShowAlertDialog((prev) => !prev);
                    setReportedId(el.id);
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
            onRightClick={(text) => {
              // api 호출
              if (reportedId !== null) {
                api
                  .post("/report", {
                    reporterId: token,
                    surveyId: reportedId,
                    reason: text,
                  })
                  .then((res) => {
                    alert("신고되었습니다.");
                    setShowAlertDialog((prev) => !prev);
                  })
                  .catch((err) => console.log(err));
              }
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
