import { useEffect, useState } from "react";
import api from "../../api/config";
import { TopBar } from "../../components/TopBar/TopBar";
import { getTimeAsString } from "../utils";
import { ListCard } from "./components/ListCard";

interface IPaymentsHistory {
  deleted: boolean;
  id: number;
  memberId: number;
  paymentItem: string;
  usedPoint: number;
  updatedAt: string;
}

export default function PaymentsHistory() {
  const [data, setData] = useState<IPaymentsHistory[]>();

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
          .catch((err) => console.error(err));
      }
    }
  }, []);

  return (
    <>
      <TopBar hasBack noShadow title="상품 교환 내역" />
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
