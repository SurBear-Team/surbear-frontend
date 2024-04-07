import { Dialog } from "@/pages/components/Dialog";
import { useRouter } from "next/router";
import { useState } from "react";
import { MakeSurvey } from "./components/MakeSurvey";
import { InputTopBar } from "@/pages/my-survey/new-survey/components/InputTopBar";
import { CreatedQuestion } from "./components/CreatedQuestion";

interface NewSurveyProps {
  title: string;
  choices: string[];
}

export default function NewSurvey() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [showCloseDialog, setShowCloseDialog] = useState(false);

  // 만들어진 설문
  const [surveyComponents, setSurveyComponents] = useState<NewSurveyProps[]>(
    []
  );
  // 설문 만들기
  const addNewSurveyComponent = (newComponentData: {
    title: string;
    choices: string[];
  }) => {
    // 기존 설문 배열에 새 설문 추가
    setSurveyComponents((prevComponents) => [
      ...prevComponents,
      newComponentData,
    ]);
  };

  // 질문 삭제
  const deleteQuestion = (index: number) => {
    setSurveyComponents((prevComponents) =>
      prevComponents.filter((_, i) => i !== index)
    );
  };
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
        {surveyComponents.map((componentData, index) => (
          // 저장된 설문 표시
          <CreatedQuestion
            key={index}
            AmswerIndex={index + 1}
            title={componentData?.title}
            AnswerList={componentData?.choices}
            onDelete={() => deleteQuestion(index)}
          />
        ))}

        {/* 새 설문 추가 */}
        <MakeSurvey addNewSurveyComponent={addNewSurveyComponent} />

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
