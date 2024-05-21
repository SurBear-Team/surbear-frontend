import api from "@/pages/api/config";
import { TopBar } from "@/pages/components/TopBar/TopBar";
import { useEffect, useState } from "react";
import { ListCard } from "./components/ListCard";
import { getTimeAsString } from "../utils";
import { ISurvey } from "../browse/data";

export default function SurveyHistory() {
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
            setData(data.reverse());
          });
      }
    }
  }, []);

  return (
    <>
      <TopBar hasBack noShadow title="제작한 설문조사 내역" />
      <div className="white-screen flex-col pt-[50px] justify-start">
        <div className="inner-screen">
          {data?.map((el) => (
            <ListCard
              key={el.id}
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
