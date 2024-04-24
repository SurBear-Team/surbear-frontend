import { useState } from "react";
import { useRouter } from "next/router";
import { ProfileCard } from "./components/ProfileCard";
import { TabBar } from "../components/TabBar";
import { TopBar } from "../components/TopBar/TopBar";

export default function Profile() {
  const router = useRouter();
  // 로그인 여부 감지
  const checkToken = localStorage.getItem("surbearToken");
  if (checkToken === null) {
    router.push("/sign-in");
  }

  const [nickname, setNickname] = useState("닉네임n글자까지");
  return (
    <>
      <TopBar title={nickname} hasSetting />
      <div className="screen px-6 pt-[66px] bg-[#F8F8F8] flex-col gap-3 justify-start">
        <ProfileCard
          title="현재 포인트"
          content={`10,000 pt`}
          onClick={() => {
            router.push("/profile/point-history");
          }}
        />
        <ProfileCard
          title="상품 교환 횟수"
          content={`3 번`}
          onClick={() => {
            console.log("상품 교환 횟수");
          }}
        />
        <ProfileCard
          title="등록한 설문조사 개수"
          content={`4번`}
          onClick={() => {
            console.log("등설개");
          }}
        />
        <ProfileCard
          title="참여한 설문조사 개수"
          content={`46개`}
          onClick={() => {
            console.log("참설개");
          }}
        />
      </div>
      <TabBar />
    </>
  );
}
