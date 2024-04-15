import { Dialog } from "@/pages/components/Dialog";
import { useRouter } from "next/router";
import { useState } from "react";
import { MakeSurvey } from "./components/MakeSurvey";
import { InputTopBar } from "@/pages/my-survey/new-survey/components/InputTopBar";
import { CreatedQuestion } from "./components/CreatedQuestion";
import { MinusIcon, PlusIcon } from "@/pages/components/styles/Icons";
import { EditSurvey } from "./components/EditSurvey";
import { useRecoilValue } from "recoil";
import { newSurveyState } from "../surveyState";
import { Overlay } from "@/pages/components/styles/Overlay";

export interface NewSurveyProps {
  title: string;
  type: string;
  choices?: string[];
  count?: number;
}

export default function NewSurvey() {
  const router = useRouter();

  const recoilSurvey = useRecoilValue(newSurveyState);
  const [title, setTitle] = useState(recoilSurvey.surveyTitle);
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

  // GPT
  const [showGTP, setShowGPT] = useState(true);
  const [questions, setQuestions] = useState([
    recoilSurvey.surveyTitle,
    "222",
    "333",
  ]);
  const addGPTClick = () => {
    if (selectedQuestion) {
      setShowGPT(false);
      setNewSurvey(true);
    }
  };

  const [selectedQuestion, setSelectedQuestion] = useState(null);

  const handleSelectQuestion = (question: any) => {
    setSelectedQuestion(question);
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
            title={selectedQuestion}
          />
        ) : (
          // 버튼 보임
          <div className="flex flex-col">
            <button
              className="medium-Btn white-bg-primary-btn self-center w-auto mt-6 flex items-center gap-1"
              onClick={() => {
                setNewSurvey((prev) => !prev);
                setSelectedQuestion(null);
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
        {/* GPT */}
        {showGTP && (
          <div className="fixed h-screen flex items-center justify-center z-50">
            <Overlay onClick={() => {}} />
            <div className="card bg-white flex-col gap-6 z-50 max-w-[400px]">
              {/* 타이틀 */}
              <span className="whitespace-nowrap sm-gray-9-text text-base">
                이런 질문은 어떠세요? <br /> ChatGPT가 질문을 추천해드려요!
                <div className="whitespace-nowrap sm-gray-9-text text-base pt-2">
                  마음에 드는 질문을 선택할 수 있어요!
                </div>
              </span>
              {/* 추천 받은 질문들 */}
              <div className="flex flex-col gap-4">
                {questions.map((question) => (
                  <div key={question} className="flex items-center gap-2">
                    <div
                      className={`check-box ${
                        selectedQuestion === question
                          ? "bg-[#6E7CF2]"
                          : "bg-white border border-gray-7"
                      }`}
                      onClick={() => handleSelectQuestion(question)}
                    />
                    {question}
                  </div>
                ))}
              </div>

              {/* 회색선 */}
              <div className="gray-line my-6" />

              {/* 버튼들 */}
              <div className="w-full flex gap-4">
                <button
                  onClick={() => {
                    setShowGPT(false);
                  }}
                  className="long-button bg-white text-gray-5 border-gray-5 w-full"
                >
                  추가하지 않기
                </button>
                <button
                  onClick={addGPTClick}
                  className="long-button primary-btn-style w-full"
                >
                  추가하고 시작!
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
