import api from "@/api/config";
import { TopBar } from "@/components/TopBar/TopBar";
import { ListCard } from "@/pages/profile/components/ListCard";
import { getTimeAsString } from "@/pages/utils";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface IPointHistory {
  id: number;
  payerId: number;
  recipientId: number;
  description: string;
  paidPoint: number;
  paymentType: string;
  deleted: boolean;
  updatedAt: string;
}

export default function PointHistory() {
  const router = useRouter();
  const { nickname } = router.query;

  const [token, setToken] = useState("");
  useEffect(() => {
    if (typeof window !== undefined) {
      if (localStorage.getItem("surbearToken") !== undefined) {
        setToken(localStorage.getItem("surbearToken")!);
      }
    }
  }, []);

  const [data, setData] = useState<IPointHistory[]>();
  useEffect(() => {
    if (nickname !== undefined) {
      api
        .get("/point/history/admin", {
          params: { nickname: nickname },
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setData(res.data.reverse()))
        .catch((err) => console.error(err));
    }
  }, []);

  return (
    <>
      <TopBar hasBack noShadow title="회원 포인트 내역" />
      <div className="white-screen flex-col pt-[50px] justify-start">
        <div className="inner-screen">
          {data?.map((el) => (
            <ListCard
              key={el.id}
              getTime={getTimeAsString(el.updatedAt)}
              content={el.description}
              plusMinus={
                el.paymentType === "CANCEL" || el.paymentType === "BUY_PRODUCT"
                  ? "-"
                  : "+"
              }
              point={el.paidPoint + ""}
            />
          ))}
        </div>
      </div>
    </>
  );
}
