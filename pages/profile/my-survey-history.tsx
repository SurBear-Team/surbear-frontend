import api from "@/pages/api/config";
import { TopBar } from "@/pages/components/TopBar/TopBar";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ListCard } from "./components/ListCard";
import { getTimeAsString } from "../utils";
import { ISurvey } from "../browse/data";

export default function SurveyHistory() {
  const router = useRouter();

  const [data, setData] = useState<ISurvey[]>();
  useEffect(() => {
    if (typeof window !== undefined) {
      const token = localStorage.getItem("surbearToken");
      if (token !== undefined) {
        api
          .get(`/member/profile/list`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((res) => {
            const data = res.data;
            setData(data);
          });
      }
    }
  }, []);

  return (
    <>
      <TopBar hasBack noShadow title="등록한 설문조사 내역" />
      <div className="white-screen flex-col pt-[50px] justify-start">
        <div className="inner-screen">
          {data?.map((el) => (
            <ListCard
              getTime={getTimeAsString(el.startDate)}
              content={el.title}
              status={el.ongoingType}
            />
          ))}
        </div>
      </div>
    </>
  );
}
