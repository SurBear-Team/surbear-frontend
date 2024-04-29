import api from "@/pages/api/config";
import { ISurvey } from "@/pages/browse/data";
import { TopBar } from "@/pages/components/TopBar/TopBar";
import { ListCard } from "@/pages/profile/components/ListCard";
import { getTime } from "@/pages/utils";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function MemberSurvey() {
  const router = useRouter();

  const [data, setData] = useState<ISurvey[]>();
  const { id: nickname } = router.query;
  useEffect(() => {
    if (nickname !== undefined) {
      api.get(`/role/participating`, { params: { nickname } }).then((res) => {
        const data = res.data;
        setData(data);
      });
    }
  }, []);

  console.log(data);
  return (
    <>
      <TopBar hasBack noShadow title="회원 설문조사 내역" />
      <div className="white-screen flex-col pt-[50px] justify-start">
        <div className="inner-screen">
          {data?.map((el) => (
            <ListCard
              key={el.id}
              getTime={
                getTime(el.startDate, true) === null
                  ? "시작 전"
                  : getTime(el.startDate, true)
              }
              content={el.title}
              status={el.ongoingType}
              hasEdit
            />
          ))}
        </div>
      </div>
    </>
  );
}
