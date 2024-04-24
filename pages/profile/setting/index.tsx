import { ArrowBackIcon } from "@/pages/components/styles/Icons";
import { useRouter } from "next/router";
import { SettingCard } from "../components/SettingCard";
import { useState } from "react";
import { Dialog } from "@/pages/components/Dialog";
import { TopBar } from "@/pages/components/TopBar/TopBar";

export default function ProfileSetting() {
  const router = useRouter();

  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [showWithdrawalDialog, setShowWithdrawalDialog] = useState(false);
  return (
    <>
      <TopBar title="설정" hasBack noShadow />
      <div className="white-screen flex-col justify-start pt-[50px]">
        <div className="inner-screen">
          <SettingCard
            title="회원 정보 수정"
            onClick={() => {
              router.push("/profile/setting/update");
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
        </div>
        {showLogoutDialog && (
          <>
            <div className="flex justify-center">
              <Dialog
                title="로그아웃 하시겠습니까?"
                leftText="취소"
                onLeftClick={() => {
                  setShowLogoutDialog((prev) => !prev);
                }}
                rightText="확인"
                onRightClick={() => {
                  localStorage.removeItem("surbearToken");
                  router.push("/sign-in");
                }}
                isDelete={true}
              />
            </div>
          </>
        )}

        {showWithdrawalDialog && (
          <>
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
