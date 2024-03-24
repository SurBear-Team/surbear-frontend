import { useRouter } from "next/router";
import { TopBar } from "../components/TopBar";
import { ArrowBackIcon } from "../components/styles/Icons";
import { SettingCard } from "./components/SettingCard";

export default function ProfileSetting() {
  const route = useRouter();
  return (
    <>
      <TopBar
        leftSVG={<ArrowBackIcon />}
        onLeftClick={() => {
          route.back();
        }}
        title="설정"
      />
      <div className="screen flex-col justify-start pt-[66px]">
        <SettingCard
          title="회원 정보 수정"
          onClick={() => {
            console.log("회원 정보 수정");
          }}
        />
        <SettingCard
          title="문의하기"
          onClick={() => {
            console.log("문의하기");
          }}
        />
        <SettingCard
          title="회원 탈퇴"
          onClick={() => {
            console.log("회원 탈퇴");
          }}
        />
      </div>
    </>
  );
}
