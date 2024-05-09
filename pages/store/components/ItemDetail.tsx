import { ArrowBackIcon, ReportIcon } from "@/pages/components/styles/Icons";
import { motion } from "framer-motion";
import { Overlay } from "@/pages/components/styles/Overlay";
import { useEffect, useState } from "react";
import api from "@/pages/api/config";

interface IDetail {
  goodsCode: string;
  onBackClick: () => void;
}

interface IGoodsDetail {
  brandName: string;
  categoryName1: string;
  content: string;
  goodsCode: string;
  goodsImgB: string;
  goodsName: string;
  goodsTypeNm: string;
  limitDay: string;
  salePrice: string;
}

export default function ItemDetail({ goodsCode, onBackClick }: IDetail) {
  const [data, setData] = useState<IGoodsDetail>();
  useEffect(() => {
    api
      .get(`/external`, { params: { goodsCode } })
      .then((res) => {
        setData(res.data.result.goodsDetail);
      })
      .catch((err) => console.log(err));
  }, [goodsCode]);
  return (
    <>
      <Overlay onClick={onBackClick} />
      <motion.div
        onClick={onBackClick}
        className="fixed top-0 left-auto right-auto w-full max-w-xl h-screen px-6 pt-[106px] pb-[105px] z-40"
      >
        <motion.div
          onClick={(e) => e.stopPropagation()}
          layoutId={goodsCode}
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
                      src={data?.goodsImgB}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="font-semibold text-base text-gray-9">
                      {data?.goodsName}
                    </div>
                    <div className="flex flex-col sm-gray-text whitespace-pre-wrap">
                      {`브랜드 : ${data?.brandName}\n카테고리 : ${data?.categoryName1}\n상품 종류 : ${data?.goodsTypeNm}`}
                    </div>
                  </div>
                  <div className="text-gray-9 text-base font-bold">{`${data?.salePrice} pt`}</div>
                </div>
              </div>
              {/* 본문 */}
              <div className="gray-line mt-4" />
              <div className="flex font-semibold text-gray-9 text-base overflow-y-scroll hide-scrollbar">
                <div className="w-full px-2 py-4 flex flex-col gap-4">
                  <div>
                    <div className="font-bold">[상품 안내]</div>
                    <span className="font-normal whitespace-pre-wrap">{`${data?.content}`}</span>
                  </div>
                  <div>
                    <div className="font-bold">[이용 안내]</div>
                    <div className="font-normal">
                      {`- 교환 유효기간은 발행일로부터 ${data?.limitDay}일입니다.`}
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
