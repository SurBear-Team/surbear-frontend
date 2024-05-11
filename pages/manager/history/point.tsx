import api from "@/pages/api/config";
import { TopBar } from "@/pages/components/TopBar/TopBar";
import { ListCard } from "@/pages/profile/components/ListCard";
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
}

export default function PointHistory() {
  const [updateList, setUpdateList] = useState(0);

  const router = useRouter();
  const [data, setData] = useState<IPointHistory[]>();
  useEffect(() => {
    api.get("/point").then((res) => setData(res.data));
  }, [updateList]);

  const [token, setToken] = useState("");
  useEffect(() => {
    if (typeof window !== undefined) {
      if (localStorage.getItem("surbearToken") !== undefined) {
        setToken(localStorage.getItem("surbearToken")!);
      }
    }
  }, []);

  return (
    <>
      <TopBar title="포인트 지급 내역" hasBack noShadow />
      <div className="white-screen flex-col justify-start pt-[66px]">
        {data?.map((el) => {
          return (
            <ListCard
              key={el.id}
              getTime=""
              content={`${el.recipientId} 에게 ${el.paidPoint} 포인트 지급`}
              surveyOwner={`지급자 : ${el.payerId}`}
              hasCancel
              onCancelClick={() => {
                api
                  .post(
                    "/point/canceling",
                    {},
                    {
                      headers: { Authorization: `Bearer ${token}` },
                      params: { pointHistoryId: el.id },
                    }
                  )
                  .then((res) => {
                    alert("지급이 취소되었습니다.");
                    setUpdateList((prev) => prev + 1);
                  })
                  .catch((err) => alert("사용자 인증을 확인해주세요."));
              }}
            />
          );
        })}
      </div>
    </>
  );
}
