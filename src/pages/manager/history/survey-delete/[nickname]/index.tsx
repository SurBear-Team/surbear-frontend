// 설문조사 강제 삭제 내역
import api from "@/pages/api/config";
import { TopBar } from "@/pages/components/TopBar/TopBar";
import { ListCard } from "@/pages/profile/components/ListCard";
import { getTimeAsString } from "@/pages/utils";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface IDeletedSurvey {
  createdAt: string;
  nickname: string;
  title: string;
}

export default function SurveyDelete() {
  const router = useRouter();
  const { nickname } = router.query;
  const [data, setData] = useState<IDeletedSurvey[]>();
  useEffect(() => {
    if (nickname !== undefined && nickname !== "undefined") {
      api
        .get("/deletion/list", { params: { nickname: nickname } })
        .then((res) => {
          if (res.data !== undefined)
            setData(
              res.data.sort((a: IDeletedSurvey, b: IDeletedSurvey) => {
                if (a.createdAt > b.createdAt) return -1;
                if (a.createdAt < b.createdAt) return 1;
              })
            );
        })
        .catch((err) => console.error(err));
    }
  }, [nickname]);

  return (
    <>
      <TopBar title="설문조사 강제 삭제 내역" hasBack noShadow />
      <div className="white-screen flex-col justify-start pt-12">
        {data &&
          data.map((el, index) => (
            <ListCard
              key={index}
              getTime={getTimeAsString(el.createdAt)}
              content={el.title}
              surveyOwner={`삭제 : ${el.nickname}`}
            />
          ))}
      </div>
    </>
  );
}
