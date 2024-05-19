import { AnimatePresence } from "framer-motion";
import { TopBar } from "../components/TopBar/TopBar";
import { TabBar } from "../components/TabBar";
import ItemCard from "./components/ItemCard";
import ItemDetail from "./components/ItemDetail";
import { useEffect, useState } from "react";
import api from "../api/config";
import Pagination from "../browse/components/Pagination";
import { useRecoilState } from "recoil";
import { goodsSearchAtom } from "../atoms";
import { useRouter } from "next/router";
import { Dialog } from "../components/Dialog";
import { useOneBtnDialog } from "../hooks/useOneBtnDialog";

interface IGoods {
  createdAt: string;
  updatedAt: string;
  goodsCode: string;
  salePrice: string;
  goodsImgS: string;
  goodsName: string;
  brandName: string;
  goodsTypeDtlNm: string;
}

export default function Store() {
  const router = useRouter();
  const [showDetail, setShowDetail] = useState(false);
  const [detailId, setDetailId] = useState<string | null>(null);

  const { oneBtnDialog, showOneBtnDialog, hideOneBtnDialog } =
    useOneBtnDialog();

  const [data, setData] = useState<IGoods[]>();

  const [goodsSearch, setGoodsSearch] = useRecoilState(goodsSearchAtom);

  const [page, setPage] = useState(0);
  const [lastPage, setLastPage] = useState(0);
  const GOODS_PER_PAGE = 20;
  useEffect(() => {
    if (goodsSearch === "") {
      api
        .get(`/external/${page}/${GOODS_PER_PAGE}`)
        .then((res) => {
          setData(res.data.content);
          setLastPage(res.data.totalPages);
        })
        .catch((err) => console.log(err));
    } else {
      api
        .get(`/external/${goodsSearch}`)
        .then((res) => {
          const temp = res.data;
          const currentData = temp.slice(page * 20, page * 20 + 20);
          setData(currentData);
          setLastPage(Math.ceil(temp.length / 20));
        })
        .catch((err) => console.error("검색 결과가 없습니다."));
    }
  }, [page, goodsSearch]);

  // 검색 시 1페이지로 설정
  useEffect(() => {
    setPage(0);
  }, [goodsSearch]);

  return (
    <>
      <TopBar
        title="상품 교환"
        hasSearch
        subTitle={
          goodsSearch === "" ? "전체" : `'${goodsSearch}' 에 대한 검색 결과`
        }
      />
      <div className="screen">
        <div className="list-screen">
          <AnimatePresence>
            <div className="list">
              {data?.map((el) => (
                <ItemCard
                  key={el.goodsCode}
                  onClick={() => {
                    setShowDetail((prev) => !prev);
                    setDetailId(el.goodsCode);
                  }}
                  layoutId={el.goodsCode}
                  img={el.goodsImgS}
                  name={el.goodsName}
                  company={el.brandName}
                  price={+el.salePrice}
                  type={el.goodsTypeDtlNm}
                />
              ))}
            </div>
            {showDetail && (
              <ItemDetail
                key={detailId!}
                goodsCode={detailId!}
                onBackClick={() => setShowDetail((prev) => !prev)}
                onBuyClick={() => {
                  if (typeof window !== undefined) {
                    if (localStorage.getItem("surbearToken") !== null) {
                      router.push(`/store/${detailId}`);
                    } else {
                      showOneBtnDialog("로그인이 필요한 서비스입니다");
                    }
                  }
                }}
              />
            )}
          </AnimatePresence>
        </div>
      </div>
      <Pagination
        currentPage={page + 1}
        lastPage={lastPage}
        onPrevClick={() => {
          page - 1 !== -1 && setPage((prev) => prev - 1);
        }}
        onNextClick={() => {
          page + 1 !== lastPage && setPage((prev) => prev + 1);
        }}
        onNumClick={(clickedNum) => {
          setPage(clickedNum - 1);
        }}
      />
      <TabBar />
      {oneBtnDialog.open && (
        <Dialog
          onlyOneBtn
          title={oneBtnDialog.title}
          rightText="확인"
          onRightClick={() => {
            router.push("/sign-in");
            hideOneBtnDialog();
          }}
        />
      )}
    </>
  );
}
