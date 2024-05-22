import { useRouter } from "next/router";
import { TopBar } from "../../components/TopBar/TopBar";
import { SettingCard } from "../profile/components/SettingCard";

export default function ManagerFunction() {
  const router = useRouter();
  return (
    <>
      <TopBar hasBack noShadow title="관리자 기능" />
      <div className="white-screen flex-col justify-start pt-12">
        <div className="inner-screen">
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
      </div>
    </>
  );
}
