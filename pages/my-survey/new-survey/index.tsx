import { Dialog } from "@/pages/components/Dialog";
import { useRouter } from "next/router";
import { useState } from "react";
import { MakeSurvey } from "./components/MakeSurvey";
import { InputTopBar } from "@/pages/my-survey/new-survey/components/InputTopBar";
import { CreatedQuestion } from "./components/CreatedQuestion";

export default function NewSurvey() {
  const router = useRouter();

  const [title, setTitle] = useState("");

  const [showCloseDialog, setShowCloseDialog] = useState(false);

  const [surveyComponents, setSurveyComponents] = useState([{}]);
  const addNewSurveyComponent = () => {
    setSurveyComponents((prevSurveys) => [...prevSurveys, {}]);
  };

  let MultipleList = ["ex1", "ex2", "ex3"];
  return (
    <>
      <InputTopBar
        title={title}
        setTitle={setTitle}
        onBackClick={() => {
          setShowCloseDialog((prev) => !prev);
        }}
      />
      <div className="screen flex-col pt-14 justify-start">
        <CreatedQuestion
          AmswerIndex={1}
          title={`제목`}
          AnswerList={MultipleList}
        />

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
