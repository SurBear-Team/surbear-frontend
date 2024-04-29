import api from "@/pages/api/config";
import { ISurvey } from "@/pages/browse/data";
import { TopBar } from "@/pages/components/TopBar/TopBar";
import { ListCard } from "@/pages/profile/components/ListCard";
import { getTime } from "@/pages/utils";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function MemberSurvey() {
  const router = useRouter();

  const [data, setData] = useState();
  const { id: nickname } = router.query;
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

  // 토큰으로 설문참여내역 조회 테스트
  useEffect(() => {
    if (typeof window !== undefined) {
      const token = localStorage.getItem("surbearToken");
      if (token !== undefined) {
        api
          .get("/member/survey/history", {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((res) => console.log(res))
          .catch((err) => console.log(err));
      }
    }
  }, []);

  return (
    <>
      <TopBar hasBack noShadow title="회원 설문조사 참여 내역" />
      <div className="white-screen flex-col pt-[50px] justify-start">
        <div className="inner-screen"></div>
      </div>
    </>
  );
}
