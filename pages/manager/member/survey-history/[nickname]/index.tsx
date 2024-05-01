import api from "@/pages/api/config";
import { TopBar } from "@/pages/components/TopBar/TopBar";
import { ListCard } from "@/pages/profile/components/ListCard";
import { getTimeAsString } from "@/pages/utils";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export interface IMemberHistory {
  createdAt: string;
  deleted: boolean;
  id: number;
  nickname: string;
  title: string;
}

export default function MemberSurvey() {
  const router = useRouter();

  const [data, setData] = useState<IMemberHistory[]>();
  const { nickname } = router.query;
  useEffect(() => {
    if (nickname !== undefined) {
      api
        .get(`/role/participating/history`, { params: { nickname } })
        .then((res) => {
          const data = res.data;
          setData(data);
        });
    }
  }, []);

  return (
    <>
      <TopBar hasBack noShadow title="회원 설문조사 참여 내역" />
      <div className="white-screen flex-col pt-[50px] justify-start">
        <div className="inner-screen">
          {data?.map((el) => (
            <ListCard
              key={el.id}
              getTime={getTimeAsString(el.createdAt)}
              content={el.title}
              surveyOwner={el.nickname}
            />
          ))}
        </div>
      </div>
    </>
  );
}
