import { useRouter } from "next/router";
import { TopBar } from "../components/TopBar";
import { ArrowBackIcon } from "../components/styles/Icons";
import { SettingCard } from "../profile/components/SettingCard";

export default function ManagerFunction() {
  const router = useRouter();
  return (
    <>
      <TopBar
        leftSVG={<ArrowBackIcon />}
        onLeftClick={() => {
          router.push("/sign-in");
        }}
        title="관리자 기능"
      />
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
