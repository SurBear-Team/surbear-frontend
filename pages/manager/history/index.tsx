// 관리자 내역 조회

import { TopBar } from "@/pages/components/TopBar/TopBar";
import { SettingCard } from "@/pages/profile/components/SettingCard";
import { useRouter } from "next/router";

export default function ManagerHistory() {
  const router = useRouter();
  return (
    <>
      <TopBar title="관리자 내역 조회" hasBack />
      <div className="screen flex-col justify-start pt-[66px]">
        <SettingCard
          title="설문조사 강제 삭제 내역"
          onClick={() => {
            router.push("/manager/history/survey-delete");
          }}
        />
        <SettingCard
          title="포인트 지급 내역"
          onClick={() => {
            router.push("/manager/history/point");
          }}
        />
      </div>
    </>
  );
}
