import { TopBar } from "@/pages/components/TopBar/TopBar";
import { Overlay } from "@/pages/components/styles/Overlay";
import { SettingCard } from "@/pages/profile/components/SettingCard";
import { useState } from "react";
import { InputDialog } from "../components/InputDialog";

export default function Member() {
  const [showPopUp, setShowPopUp] = useState(false);
  const [popUpType, setPopUpType] = useState("");
  return (
    <>
      <TopBar hasBack noShadow title="회원 관리" />
      <div className="white-screen flex-col justify-start pt-12">
        <div className="inner-screen">
          <SettingCard
            title="회원 정보 조회"
            onClick={() => {
              setShowPopUp((prev) => !prev);
              setPopUpType("memberInfo");
            }}
          />
          <SettingCard title="회원 설문조사 조회" onClick={() => {}} />
          <SettingCard
            title="회원 설문조사 참여 내역 조회"
            onClick={() => {}}
          />
          <SettingCard title="회원 포인트 내역 조회" onClick={() => {}} />
          <SettingCard title="회원 상품 교환 내역 조회" onClick={() => {}} />
          <SettingCard title="포인트 지급" onClick={() => {}} />
        </div>
      </div>
      {showPopUp && (
        <>
          <Overlay onClick={() => setShowPopUp((prev) => !prev)} />
          {popUpType === "memberInfo" && (
            <InputDialog
              title="회원 정보 조회"
              placeholder="조회할 닉네임을 입력해주세요"
              rightText="조회"
              leftText="취소"
              onLeftClick={() => setShowPopUp((prev) => !prev)}
              onRightClick={() => console.log("조회")}
            />
          )}
        </>
      )}
    </>
  );
}
