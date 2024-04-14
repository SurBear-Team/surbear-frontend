import { TopBar } from "@/pages/components/TopBar";
import { ArrowBackIcon } from "@/pages/components/styles/Icons";
import { useRouter } from "next/router";
import { MemberUpdateCard } from "../components/MemberUpdateCard";
import { useState } from "react";
import { Dialog } from "@/pages/components/Dialog";
import { Overlay } from "@/pages/components/styles/Overlay";
import { AgeSheet } from "@/pages/sign-up/Components/AgeSheet";

export default function MemberUpdate() {
  const route = useRouter();

  const [showNicknameDialog, setShowNicknameDialog] = useState(false);

  const [selectedAge, setSelectedAge] = useState("20대");
  const [showSheet, setShowSheet] = useState(false);

  const toggleShowSheet = () => {
    setShowSheet(!showSheet);
  };

  return (
    <>
      <TopBar
        leftSVG={<ArrowBackIcon />}
        onLeftClick={() => {
          route.back();
        }}
        title="회원 정보 수정"
      />
      <div className="white-screen flex-col justify-start pt-[50px]">
        <div className="inner-screen">
          <MemberUpdateCard
            title="닉네임"
            content={`user nickname`}
            onClick={() => {
              setShowNicknameDialog((prev) => !prev);
            }}
          />

          <MemberUpdateCard
            title="나이대"
            content={`user age big`}
            onClick={() => {
              setShowSheet(true);
            }}
          />
        </div>

        {showNicknameDialog && (
          <>
            <div className="flex justify-center">
              <Dialog
                title="새 닉네임"
                leftText="취소"
                onLeftClick={() => {
                  setShowNicknameDialog((prev) => !prev);
                }}
                rightText="수정"
                onRightClick={() => {
                  console.log("수정");
                }}
              />
            </div>
          </>
        )}

        {showSheet && (
          <>
            <Overlay onClick={() => setShowNicknameDialog((prev) => !prev)} />
            <AgeSheet
              showSheet={showSheet}
              onClose={toggleShowSheet}
              onSelected={setSelectedAge}
            />
          </>
        )}
      </div>
    </>
  );
}
