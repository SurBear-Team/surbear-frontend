import { AnimatePresence } from "framer-motion";
import { TopBar } from "../components/TopBar/TopBar";
import { TabBar } from "../components/TabBar";
import ItemCard from "./components/ItemCard";
import ItemDetail from "./components/ItemDetail";
import { useState } from "react";

export default function Store() {
  const data = [
    {
      code: "0000",
      message: null,
      result: {
        listNum: 8,
        goodsList: [
          {
            rmIdBuyCntFlagCd: "N",
            discountRate: 6,
            mdCode: "M000100615",
            endDate: "2999-12-30T15:00:00.000+0000",
            affliateId: "ELEVEN",
            discountPrice: 750,
            mmsGoodsImg:
              "https://biz.giftishow.com/Resource/goods/G00000280811/G00000280811_250.jpg",
            srchKeyword: "광동)비타500, 비타민, 건강음료, 세븐일레븐",
            limitDay: 30,
            content: "내용",
            goodsImgB:
              "https://biz.giftishow.com/Resource/goods/G00000280811/G00000280811.jpg",
            goodsTypeNm: "일반상품(물품교환형)",
            exhGenderCd: "WOMAN",
            exhAgeCd: "10",
            validPrdDay: "20190814",
            goodsComName: "세븐일레븐",
            goodsName: "광동)비타500 100ml 병",
            mmsReserveFlag: "Y",
            popular: 1,
            goodsStateCd: "SALE",
            brandCode: "BR00046",
            goodsNo: 21445,
            brandName: "세븐일레븐",
            mmsBarcdCreateYn: "Y",
            salePrice: 800,
            brandIconImg:
              "https://biz.giftishow.com/Resource/brand/BR_20140528_171011_3.jpg",
            goodsComId: "S000002705",
            rmCntFlag: "N",
            saleDateFlagCd: "PERIOD_SALE",
            contentAddDesc: "",
            goodsCode: "G00000280811",
            goodsTypeDtlNm: "편의점",
            category1Seq: 4,
            goodsImgS:
              "https://biz.giftishow.com/Resource/goods/G00000280811/G00000280811_250.jpg",
            affiliate: "세븐일레븐/바이더웨이",
            validPrdTypeCd: "01",
            saleDateFlag: "N",
            realPrice: 800,
          },
        ],
      },
    },
  ];

  const [showDetail, setShowDetail] = useState(false);
  const [detailId, setDetailId] = useState<string | null>(null);

  return (
    <>
      <TopBar title="상품 교환" hasSearch subTitle="전체" />
      <div className="screen">
        <div className="list-screen">
          <AnimatePresence>
            <div className="list">
              {data.map((el) => (
                <ItemCard
                  key={el.result.goodsList[0].goodsCode}
                  onClick={() => {
                    setShowDetail((prev) => !prev);
                    setDetailId(el.result.goodsList[0].goodsCode);
                  }}
                  layoutId={el.result.goodsList[0].goodsCode}
                  img={el.result.goodsList[0].goodsImgS}
                  name={el.result.goodsList[0].goodsName}
                  company={el.result.goodsList[0].goodsComName}
                  price={el.result.goodsList[0].discountPrice}
                />
              ))}
            </div>
            {showDetail && (
              <ItemDetail
                layoutId={detailId!}
                // api 연동 이후 수정 필요
                goodsCode={detailId!}
                onBackClick={() => setShowDetail((prev) => !prev)}
              />
            )}
          </AnimatePresence>
        </div>
      </div>
      <TabBar />
    </>
  );
}
