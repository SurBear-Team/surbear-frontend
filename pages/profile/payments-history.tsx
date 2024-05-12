import { useRouter } from "next/router";
import { ListCard } from "./components/ListCard";
import { TopBar } from "../components/TopBar/TopBar";
import { useEffect, useState } from "react";
import api from "../api/config";
import { getTimeAsString } from "../utils";

interface IPointHistory {
  deleted: boolean;
  id: number;
  memberId: number;
  paymentItem: string;
  usedPoint: number;
  updatedAt: string;
}

export default function PointHistory() {
  const router = useRouter();
  const [data, setData] = useState<IPointHistory[]>();

  useEffect(() => {
    if (typeof window !== undefined) {
      const token = localStorage.getItem("surbearToken");
      if (token !== undefined) {
        api
          .get("/product/history", {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((res) => {
            setData(res.data.reverse());
          })
          .catch((err) => console.log(err));
      }
    }
  }, []);

  return (
    <>
      <TopBar hasBack noShadow title="현재 포인트 내역" />
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
