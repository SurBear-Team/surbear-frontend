import { useRouter } from "next/router";
import { SettingCard } from "../profile/components/SettingCard";
import { TopBar } from "../components/TopBar/TopBar";

export default function ManagerFunction() {
  const router = useRouter();
  return (
    <>
      <TopBar hasBack title="관리자 기능" />
      <div className="screen flex-col justify-start pt-[66px]">
        <SettingCard
          title="관리자 관리"
          onClick={() => {
            router.push("/manager/administration");
          }}
        />
        <SettingCard
          title="관리자 내역 조회"
          onClick={() => {
            router.push("/manager/history");
          }}
        />
        <SettingCard
          title="회원 관리"
          onClick={() => {
            router.push("/manager/member");
          }}
        />
      </div>
    </>
  );
}
