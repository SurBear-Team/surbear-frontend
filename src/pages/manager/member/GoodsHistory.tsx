import api from "@/api/config";
import { TopBar } from "@/components/TopBar/TopBar";
import { ListCard } from "@/pages/profile/components/ListCard";
import { getTimeAsString } from "@/pages/utils";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface IPointHistory {
  deleted: boolean;
  id: number;
  memberId: number;
  paymentItem: string;
  usedPoint: number;
  updatedAt: string;
}

export default function GoodsHistory() {
  const router = useRouter();
  const { nickname } = router.query;

  const [data, setData] = useState<IPointHistory[]>();

  useEffect(() => {
    if (typeof window !== undefined) {
      const token = localStorage.getItem("surbearToken");
      if (token !== undefined) {
        if (nickname !== undefined) {
          api
            .get("/product/history/admin", {
              headers: { Authorization: `Bearer ${token}` },
              params: { nickname: nickname },
            })
            .then((res) => {
              setData(res.data.reverse());
            })
            .catch((err) => console.error(err));
        }
      }
    }
  }, []);

  return (
    <>
      <TopBar hasBack noShadow title="회원 상품 교환 내역 조회" />
      <div className="white-screen flex-col pt-[50px] justify-start">
        <div className="inner-screen">
          {data?.map((el) => (
            <ListCard
              key={el.id}
              getTime={getTimeAsString(el.updatedAt)}
              content={el.paymentItem}
              plusMinus={"-"}
              point={el.usedPoint + ""}
            />
          ))}
        </div>
      </div>
    </>
  );
}
