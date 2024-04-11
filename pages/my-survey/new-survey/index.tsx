import { Dialog } from "@/pages/components/Dialog";
import { useRouter } from "next/router";
import { useState } from "react";
import { MakeSurvey } from "./components/MakeSurvey";
import { InputTopBar } from "@/pages/my-survey/new-survey/components/InputTopBar";
import { CreatedQuestion } from "./components/CreatedQuestion";
import { MinusIcon, PlusIcon } from "@/pages/components/styles/Icons";
import { EditSurvey } from "./components/EditSurvey";

export interface NewSurveyProps {
  title: string;
  type: string;
  choices?: string[];
  count?: number;
}

export default function NewSurvey() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [showCloseDialog, setShowCloseDialog] = useState(false);
  const [NewSurvey, setNewSurvey] = useState(false); // 새 설문 만들기 창 여부

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

  // 설문 수정하기
  const [editIndex, setEditIndex] = useState<number | null>(null);
  // 수정 전 초기 데이타
  const [editData, setEditData] = useState<NewSurveyProps | null>(null);

  // 질문 삭제
  const deleteQuestion = (index: number) => {
    // prevComponents는 현재 상태
    setSurveyComponents((prevComponents) =>
      // index가 i와 다른 배열만 새로 생성
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
        <div className="sm-gray-9-text text-base py-6 pl-6 self-start">{`1페이지`}</div>
        {surveyComponents.map((componentData, index) =>
          editIndex === index && editData ? ( // 수정인지 아닌지
            <EditSurvey
              key={index}
              initialData={editData}
              onSave={(updatedData) => {
                const updatedComponents = surveyComponents.map(
                  (nowItem, nowIndex) =>
                    nowIndex === editIndex ? updatedData : nowItem
                );
                setSurveyComponents(updatedComponents);
                setEditIndex(null); // 수정 모드 종료
              }}
              onCancel={() => {
                setEditIndex(null); // 수정 취소 및 모드 종료
              }}
            />
          ) : (
            <CreatedQuestion
              key={index}
              answerIndex={index + 1}
              type={componentData.type}
              title={componentData.title}
              answerList={componentData.choices}
              count={componentData.count}
              onEdit={() => {
                setEditIndex(index);
                setEditData(componentData);
              }}
              onDelete={() => deleteQuestion(index)}
            />
          )
        )}

        {NewSurvey ? (
          <MakeSurvey
            addNewSurveyComponent={addNewSurveyComponent}
            onCancel={() => setNewSurvey(false)}
          />
        ) : (
          // 버튼 보임
          <div className="flex flex-col">
            <button
              className="medium-Btn white-bg-primary-btn self-center w-auto mt-6 flex items-center gap-1"
              onClick={() => {
                setNewSurvey((prev) => !prev);
              }}
            >
              <PlusIcon /> 새 질문 추가
            </button>

            <button
              className="medium-Btn white-bg-primary-btn self-center w-auto mt-6 flex items-center gap-1"
              onClick={() => {}}
            >
              <PlusIcon /> 새 페이지 추가
            </button>

            <button
              className="medium-Btn border-red-1 text-red-1 self-center w-auto mt-6 flex items-center gap-1"
              onClick={() => {}}
            >
              <MinusIcon /> 이 페이지 삭제
            </button>
          </div>
        )}

        <div className="bg-gray-2 h-4 w-full mt-10" />

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
