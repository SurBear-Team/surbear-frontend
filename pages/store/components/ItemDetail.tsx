import { ArrowBackIcon, ReportIcon } from "@/pages/components/styles/Icons";
import { motion } from "framer-motion";
import { Overlay } from "@/pages/components/styles/Overlay";

interface IDetail {
  layoutId: string;
  goodsCode: string;
  onBackClick: () => void;
}

// goodsCode를 통해 api 호출 예정
const data = {
  code: "0000",
  message: null,
  result: {
    goodsDetail: {
      rmIdBuyCntFlagCd: "N",
      discountRate: 6,
      goldPrice: 750,
      mdCode: "M000100615",
      vipDiscountRate: 9,
      discountPrice: 750,
      mmsGoodsImg:
        "https://biz.giftishow.com/Resource/goods/G00000280811/G00000280811_250.jpg",
      limitDay: 30,
      content: "해당 쿠폰은 일부 점포에서는 취급하지 않는 상품일 수 있습니다.",
      goodsDescImgWeb: "",
      goodsImgB:
        "https://biz.giftishow.com/Resource/goods/G00000280811/G00000280811.jpg",
      goodsTypeNm: "일반상품(물품교환형)",
      categoryName1: "편의점/마트",
      vipPrice: 730,
      goodsName: "광동)비타500 100ml 병",
      mmsReserveFlag: "Y",
      goodsStateCd: "SALE",
      brandCode: "BR00046",
      goldDiscountRate: 6,
      goodsNo: 21445,
      platinumPrice: 710,
      brandName: "세븐일레븐",
      salePrice: 800,
      brandIconImg:
        "https://biz.giftishow.com/Resource/brand/BR_20140528_171011_3.jpg",
      rmCntFlag: "N",
      goodsTypeCd: "GNR",
      platinumDiscountRate: 11,
      saleDateFlagCd: "PERIOD_SALE",
      contentAddDesc: "",
      categorySeq1: 4,
      goodsCode: "G00000280811",
      goodsTypeDtlNm: "편의점",
      goodsImgS:
        "https://biz.giftishow.com/Resource/goods/G00000280811/G00000280811_250.jpg",
      affiliate: "세븐일레븐/바이더웨이",
      saleDateFlag: "N",
      realPrice: 800,
    },
  },
};

export default function ItemDetail({ layoutId, onBackClick }: IDetail) {
  return (
    <>
      <Overlay onClick={onBackClick} />
      <motion.div
        onClick={onBackClick}
        className="fixed top-0 left-auto right-auto w-full max-w-xl h-screen px-6 pt-[106px] pb-[105px] z-40"
      >
        <motion.div
          onClick={(e) => e.stopPropagation()}
          layoutId={layoutId}
          className="flex flex-col w-full h-full rounded-lg bg-white shadow-md pt-2 pb-4 px-4"
        >
          {/* 상단 메뉴 */}
          <div className="flex justify-between items-center px-2 py-2">
            <div
              className="flex items-center gap-1 cursor-pointer"
              onClick={onBackClick}
            >
              <ArrowBackIcon isSmall={true} />
              <span className="sm-gray-9-text">뒤로가기</span>
            </div>
          </div>
          <div className="gray-line mt-2 mb-4" />
          {/* 설문 정보 */}
          <div className="flex flex-grow relative overflow-y-scroll hide-scrollbar">
            <div className="absolute flex flex-col">
              <div className="flex px-2">
                <div className="flex flex-col gap-4">
                  <div className="w-full px-6">
                    <img
                      className="w-full border rounded-lg border-gray-4"
                      src={data.result.goodsDetail.goodsImgB}
                    />
                  </div>
                  <div>
                    <div className="font-semibold text-base text-gray-9">
                      {data.result.goodsDetail.goodsName}
                    </div>
                    <div className="flex flex-col sm-gray-text">
                      {data.result.goodsDetail.brandName}
                    </div>
                  </div>
                  <div className="text-gray-9 text-base font-bold">{`${data.result.goodsDetail.discountPrice.toLocaleString()} pt`}</div>
                </div>
              </div>
              {/* 본문 */}
              <div className="gray-line mt-4" />
              <div className="flex font-semibold text-gray-9 text-base overflow-y-scroll hide-scrollbar">
                <div className="w-full px-2 py-4 flex flex-col gap-4">
                  <div>
                    <div className="font-bold">[상품 안내]</div>
                    <span className="font-normal">
                      {`- ${data.result.goodsDetail.content}`}
                    </span>
                  </div>
                  <div>
                    <div className="font-bold">[이용 안내]</div>
                    <div className="font-normal">
                      {`- 교환 유효기간은 발행일로부터 ${data.result.goodsDetail.limitDay}일입니다.`}
                    </div>
                    <div className="font-normal">
                      - 본 상품은 예시 이미지로써 실제 상품과 다를 수 있습니다.
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">[사용 안내]</div>
                    <div className="font-normal">
                      - 일부 상품은 매장의 사정에 따라 교환이 어려울 시 타
                      매장에서 교환 가능합니다.
                    </div>
                    <div className="font-normal">
                      {`- 본 쿠폰은 전국 ${data.result.goodsDetail.affiliate} 매장 중 일부 특수 점포를 제외하고 사용이 가능합니다.`}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* 하단 버튼 */}
          <div className="gray-line" />
          <div className="px-2 pt-4">
            <button className="primary-btn-style long-button">교환하기</button>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
}
