// 관리자 내역 조회

import { TopBar } from "@/components/TopBar/TopBar";
import { Overlay } from "@/components/styles/Overlay";
import { SettingCard } from "@/pages/profile/components/SettingCard";
import { useRouter } from "next/router";
import { useState } from "react";
import { InputDialog } from "../components/InputDialog";

export default function ManagerHistory() {
  const router = useRouter();
  const [showPopUp, setShowPopUp] = useState(false);
  return (
    <>
      <TopBar title="관리자 내역 조회" hasBack noShadow />
      <div className="white-screen flex-col justify-start pt-12">
        <div className="inner-screen">
          <SettingCard
            title="설문조사 강제 삭제 내역"
            onClick={() => setShowPopUp((prev) => !prev)}
          />
          <SettingCard
            title="포인트 지급 내역"
            onClick={() => {
              router.push("/manager/history/point");
            }}
          />
        </div>
      </div>
      {showPopUp && (
        <>
          <Overlay onClick={() => setShowPopUp((prev) => !prev)} />
          <InputDialog
            leftText="취소"
            onLeftClick={() => setShowPopUp((prev) => !prev)}
            rightText="조회"
            onRightClick={(data) =>
              router.push(`/manager/history/survey-delete/${data.nickname}`)
            }
            placeholder="조회할 닉네임을 입력해주세요."
            title="설문조사 강제 삭제 내역 조회"
          />
        </>
      )}
    </>
  );
}
