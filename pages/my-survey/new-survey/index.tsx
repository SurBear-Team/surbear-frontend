import { Dialog } from "@/pages/components/Dialog";
import { TopBar } from "@/pages/components/TopBar";
import { ArrowBackIcon, UpdateIcon } from "@/pages/components/styles/Icons";
import { useRouter } from "next/router";
import { useState } from "react";
import { MakeSurvey } from "./components/MakeSurvey";

export default function NewSurvey() {
  const router = useRouter();

  const [showCloseDialog, setShowCloseDialog] = useState(false);

  const [surveyComponents, setSurveyComponents] = useState([{}]);
  const addNewSurveyComponent = () => {
    setSurveyComponents((prevSurveys) => [...prevSurveys, {}]);
  };
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

      <div className="screen flex-col pt-14">
        {surveyComponents.map((_, index) => (
          <MakeSurvey
            key={index}
            addNewSurveyComponent={addNewSurveyComponent}
          />
        ))}

        {showCloseDialog && (
          <>
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
