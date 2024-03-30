import { TopBar } from "@/pages/components/TopBar";
import { ArrowBackIcon } from "@/pages/components/styles/Icons";
import { useRouter } from "next/router";
import { SettingCard } from "../components/SettingCard";
import { useState } from "react";
import { Overlay } from "@/pages/components/styles/Overlay";
import { Dialog } from "@/pages/components/Dialog";

export default function ProfileSetting() {
  const route = useRouter();

  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [showWithdrawalDialog, setShowWithdrawalDialog] = useState(false);
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
            route.push("/profile/setting/update");
          }}
        />
        <SettingCard
          title="로그아웃"
          onClick={() => {
            setShowLogoutDialog(true);
          }}
        />
        <SettingCard
          title="회원 탈퇴"
          onClick={() => {
            setShowWithdrawalDialog(true);
          }}
        />
        {showLogoutDialog && (
          <>
            <Overlay />
            <div className="flex justify-center">
              <Dialog
                title="로그아웃 하시겠습니까?"
                leftText="취소"
                onLeftClick={() => {
                  setShowLogoutDialog((prev) => !prev);
                }}
                rightText="확인"
                onRightClick={() => {
                  console.log("로그아웃");
                }}
                isDelete={true}
              />
            </div>
          </>
        )}

        {showWithdrawalDialog && (
          <>
            <Overlay />
            <div className="flex justify-center">
              <Dialog
                title="회원을 탈퇴하시겠습니까?"
                leftText="취소"
                onLeftClick={() => {
                  setShowWithdrawalDialog((prev) => !prev);
                }}
                rightText="확인"
                onRightClick={() => {
                  console.log("로그아웃");
                }}
                isDelete={true}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
}
