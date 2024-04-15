import { Dialog } from "@/pages/components/Dialog";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
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
  const [isNewSurvey, setIsNewSurvey] = useState(false); // 새 설문 만들기 창 여부
  const [alertDialog, setAlertDialog] = useState(false);
  const [alertText, setAlertText] = useState("");

  // (공통) 설문 만들기
  const addNewSurveyComponent = (newComponentData: NewSurveyProps) => {
    const newPages = [...surveyPages];
    newPages[currentPage] = [...newPages[currentPage], newComponentData];
    setSurveyPages(newPages);
    setIsNewSurvey(false);
  };

  // (공통) 설문 수정하기
  const [editIndex, setEditIndex] = useState<number | null>(null);
  // (공통) 수정 전 초기 데이타
  const [editData, setEditData] = useState<NewSurveyProps | null>(null);

  // (공통) 페이지 추가
  const addNewPage = () => {
    // 모든 페이지 검사하여 빈 페이지가 있는지 확인
    // some은 조건 만족하면 true 반환
    const emptyPageExists = surveyPages.some((page) => page.length === 0);

    // 빈 페이지 없으면 새 페이지 추가
    if (!emptyPageExists) {
      // 기존 배열을 복사하고 뒤에 새로운 배열[]을 추가
      const newPages = [...surveyPages, []];
      setSurveyPages(newPages); // 상태 업데이트
      setCurrentPage(newPages.length - 1); // 새로 생성된 페이지로 이동
    }
  };

  // (공통) 지정 index의 질문 삭제
  const deleteQuestion = (index: number) => {
    // 해당 질문의 인덱스 i와 지정한 index와 다른 질문만 남김
    const updatedPage = surveyPages[currentPage].filter((_, i) => i !== index);
    // 현재 수정중인 페이지는 업데이트된 목록으로 교체함
    setSurveyPages(
      surveyPages.map((page, idx) => (idx === currentPage ? updatedPage : page))
    );
  };

  // (공통) 질문 수정 저장
  const onSaveEdit = (updatedData: NewSurveyProps) => {
    const updatedPages = [...surveyPages];
    // 수정된 데이터를 적절한 질문 위치에 할당
    updatedPages[currentPage][editIndex!] = updatedData;
    setSurveyPages(updatedPages);
    setEditIndex(null); // 수정 모드 종료
  };

  // (공통)페이지
  const [surveyPages, setSurveyPages] = useState<NewSurveyProps[][]>([[]]);
  const [currentPage, setCurrentPage] = useState(0);

  // 다음 페이지 이동
  const goToNextPage = () => {
    if (currentPage < surveyPages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  // 이전 페이지 이동
  const goToPrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  // 현재 페이지 삭제
  const deleteCurrentPage = () => {
    // 설문의 페이지가 2 이상이라면
    if (surveyPages.length > 1) {
      // 현재 페이지를 제외한 나머지 배열로 구성된 새 배열 생성
      const updatedPages = surveyPages.filter(
        (_, index) => index !== currentPage
      );
      setSurveyPages(updatedPages);
      // 현재 페이지가 마지막 페이지였다면, 한 페이지 앞으로 이동
      if (currentPage >= updatedPages.length) {
        setCurrentPage(updatedPages.length - 1);
      }
    } else {
      // 하나의 페이지만 남았을 경우, 해당 페이지를 비워줌
      setSurveyPages([[]]);
    }
    setAlertDialog((prev) => !prev);
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
      setIsNewSurvey(true);
    }
  };
  // GPT 선택한 질문
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  // GPT 선택한 질문
  const handleSelectQuestion = (question: any) => {
    setSelectedQuestion(question);
  };

  // 콘솔 찍기
  useEffect(() => {
    // 모든 페이지의 데이터를 추출하고, 각 질문에 페이지 번호를 추가
    const allQuestionsWithPageNumbers = surveyPages.flatMap(
      (pageData, pageIndex) =>
        pageData.map((question) => ({
          ...question,
          page: pageIndex + 1, // 페이지 번호 추가 (1부터 시작)
        }))
    );

    // 콘솔에 각 질문과 해당 페이지 번호 출력
    console.log("모든 질문 : ", allQuestionsWithPageNumbers);
  }, [surveyPages]);
  return (
    <>
      <InputTopBar
        title={title}
        setTitle={setTitle}
        onBackClick={() => setShowCloseDialog(!showCloseDialog)}
      />
      <div className="white-screen flex-col pt-14 justify-start">
        <div className="inner-screen">
          <div className="sm-gray-9-text text-base py-6 pl-6 self-start">
            {`${currentPage + 1} 페이지`}
          </div>
          {surveyPages[currentPage].map((componentData, index) =>
            editIndex === index ? (
              <EditSurvey
                key={index}
                initialData={editData!}
                onSave={onSaveEdit}
                onCancel={() => setEditIndex(null)}
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

          {isNewSurvey ? (
            <MakeSurvey
              addNewSurveyComponent={addNewSurveyComponent}
              onCancel={() => setIsNewSurvey(false)}
              title={selectedQuestion}
            />
          ) : (
            // 버튼 보임
            <div className="flex flex-col">
              <button
                className="medium-Btn white-bg-primary-btn self-center w-auto mt-6 flex items-center gap-1"
                onClick={() => {
                  setIsNewSurvey((prev) => !prev);
                  setSelectedQuestion(null);
                }}
              >
                <PlusIcon /> 새 질문 추가
              </button>

              <button
                className="medium-Btn white-bg-primary-btn self-center w-auto mt-6 flex items-center gap-1"
                onClick={addNewPage}
                disabled={surveyPages.some((page) => page.length === 0)}
              >
                <PlusIcon /> 새 페이지 추가
              </button>

              <button
                className="medium-Btn border-red-1 text-red-1 self-center w-auto mt-6 flex items-center gap-1"
                onClick={() => {
                  setAlertDialog(true);
                  setAlertText("페이지를 삭제하시겠습니까?");
                }}
              >
                <MinusIcon /> 이 페이지 삭제
              </button>
            </div>
          )}

          <div className="flex gap-4 p-4 justify-between ">
            <button
              className="medium-Btn white-bg-primary-btn"
              onClick={goToPrevPage}
              disabled={currentPage === 0}
            >
              이전 페이지
            </button>
            <button
              className="medium-Btn white-bg-primary-btn"
              onClick={goToNextPage}
            >
              다음 페이지
            </button>
          </div>

          {alertDialog && (
            <Dialog
              title={alertText}
              leftText="취소"
              rightText="삭제"
              onlyOneBtn={false}
              onLeftClick={() => {
                setAlertDialog((prev) => !prev);
              }}
              onRightClick={deleteCurrentPage}
              isDelete={true}
            />
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
          {/* GPT */}
          {showGTP && (
            <>
              <Overlay onClick={() => {}} />
              <div className="card justify-center fixed bg-white flex-col gap-6 z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[400px]">
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
            </>
          )}
        </div>
      </div>
    </>
  );
}
