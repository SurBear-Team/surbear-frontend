import { useRouter } from "next/router";
import { TopBar } from "../components/TopBar";
import { ArrowBackIcon, UpdateIcon } from "../components/styles/Icons";

import { MakeSurvey } from "./components/MakeSurvey";
import { useState } from "react";
import { Dialog } from "../components/Dialog";
import { Overlay } from "../components/styles/Overlay";

export default function NewSurvey() {
  const router = useRouter();

  const [showCloseDialog, setShowCloseDialog] = useState(false);
  return (
    <>
      <TopBar
        leftSVG={<ArrowBackIcon />}
        onLeftClick={() => {
          setShowCloseDialog(true);
        }}
        title={`설문제목 2줄까지 길어지면 ... 설문제목 2...`}
        rightSVG={<UpdateIcon />}
        onRightClick={() => {
          console.log("제목 수정");
        }}
        hasShadow={true}
      />
      <div className="screen">
        <MakeSurvey />

        {showCloseDialog && (
          <>
            <Overlay />
            <Dialog
              title="설문 제작을 그만 두시겠습니까?"
              leftText="취소"
              onLeftClick={() => {
                setShowCloseDialog((prev) => !prev);
              }}
              rightText="저장하지 않고 종료"
              onRightClick={() => {
                router.back();
              }}
              isDelete={true}
            />
          </>
        )}
      </div>
    </>
  );
}
