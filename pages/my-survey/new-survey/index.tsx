import { Dialog } from "@/pages/components/Dialog";
import { useRouter } from "next/router";
import { useState } from "react";
import { MakeSurvey } from "./components/MakeSurvey";
import { InputTopBar } from "@/pages/my-survey/new-survey/components/InputTopBar";
import { CreatedQuestion } from "./components/CreatedQuestion";
import { PlusIcon } from "@/pages/components/styles/Icons";

interface NewSurveyProps {
  title: string;
  type: string;
  choices?: string[];
  count?: number;
}

export default function NewSurvey() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [showCloseDialog, setShowCloseDialog] = useState(false);
  const [NewSurvey, setNewSurvey] = useState(false);

  // 만들어진 설문
  const [surveyComponents, setSurveyComponents] = useState<NewSurveyProps[]>(
    []
  );

  // (객관식) 설문 만들기
  const addNewSurveyComponent = (newComponentData: NewSurveyProps) => {
    // 기존 설문 배열에 새 설문 추가
    setSurveyComponents((prevComponents) => [
      ...prevComponents,
      newComponentData,
    ]);
    setNewSurvey(false);
  };

  // (단답형) 설문 만들기

  // (슬라이더) 설문 만들기

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
      <div className="white-screen flex-col pt-14 justify-start">
        {surveyComponents.map((componentData, index) => (
          // 저장된 설문 표시
          <CreatedQuestion
            key={index}
            answerIndex={index + 1}
            type={componentData.type}
            title={componentData?.title}
            answerList={componentData?.choices}
            count={componentData.count}
            onEdit={() => {}}
            onDelete={() => deleteQuestion(index)}
          />
        ))}

        {NewSurvey ? (
          <MakeSurvey addNewSurveyComponent={addNewSurveyComponent} />
        ) : (
          // 새 질문 추가 버튼 보임
          <button
            className="medium-Btn white-bg-primary-btn self-center w-auto mt-6 flex items-center gap-1"
            onClick={() => {
              setNewSurvey((prev) => !prev);
            }}
          >
            <PlusIcon /> 새 질문 추가
          </button>
        )}

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
