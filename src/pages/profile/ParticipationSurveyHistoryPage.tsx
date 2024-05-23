import api from "@/api/config";
import { TopBar } from "@/components/TopBar/TopBar";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getTimeAsString } from "../utils";
import { ListCard } from "./components/ListCard";

export interface IHistory {
  createdAt: string;
  deleted: boolean;
  id: number;
  openType: boolean;
  title: string;
}

export default function ParticipationSurveyHistory() {
  const router = useRouter();
  const [token, setToken] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem("surbearToken");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const fetchSurveyHistory = async () => {
    const { data } = await api.get("/member/survey/history", {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (data) {
      data.sort((a: IHistory, b: IHistory) => {
        if (a.createdAt > b.createdAt) return -1;
        if (a.createdAt < b.createdAt) return 1;
      });
    }

    return data;
  };
  const { data } = useQuery<IHistory[]>(
    ["surveyHistory", token],
    fetchSurveyHistory,
    {
      enabled: !!token,
      cacheTime: 1000 * 60 * 5,
      staleTime: 1000 * 60 * 5,
    }
  );

  // 결과 보기 버튼 누르면
  const moveToResult = (id: number) => {
    router.push(`/result/${id}`);
  };

  return (
    <>
      <TopBar hasBack noShadow title="참여한 설문조사 내역" />
      <div className="white-screen flex-col pt-[50px] justify-start">
        <div className="inner-screen">
          {data?.map((el) => (
            <ListCard
              key={el.id}
              getTime={getTimeAsString(el.createdAt)}
              content={el.title}
              openType={el.openType}
              viewResult={() => {
                moveToResult(el.id);
              }}
            />
          ))}
        </div>
      </div>
    </>
  );
}
