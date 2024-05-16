import { Dialog } from "@/pages/components/Dialog";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { MakeSurvey } from "./components/MakeSurvey";
import { CreatedQuestion } from "./components/CreatedQuestion";
import { MinusIcon } from "@/pages/components/styles/Icons";
import { EditSurvey } from "./components/EditSurvey";
import { Overlay } from "@/pages/components/styles/Overlay";
import { SurveyTabBar } from "./components/SurveyTabBar";
import { TopBar } from "@/pages/components/TopBar/TopBar";
import { useRecoilState } from "recoil";
import { surveyIdAtom } from "../surveyState";
import { useQuery, useQueryClient } from "react-query";
import api from "@/pages/api/config";

export interface NewSurveyProps {
  id?: number;
  title: string;
  type: string;
  choices?: string[];
  count?: number;
  page?: number;
  required?: boolean;
  surveyId?: number;
  questionOrder?: number;
  options?: { id: number; answer: string }[];
}

export default function NewSurvey() {
  const router = useRouter();

  const [surveyId, setSurveyId] = useRecoilState(surveyIdAtom);
  const [surveyTitle, setSurveyTitle] = useState("");
  const [surveyQuestions, setSurveyQuestions] = useState<NewSurveyProps[]>([]);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const localTitle = localStorage.getItem("surveyTitle");
    if (localTitle) {
      setSurveyTitle(localTitle);
    }
  }, []);

  const [showCloseDialog, setShowCloseDialog] = useState(false);
  const [isNewSurvey, setIsNewSurvey] = useState(false); // 새 설문 만들기 창
  const [alertDialog, setAlertDialog] = useState(false);
  const [alertText, setAlertText] = useState("");

  const [saveDialog, setSaveDialog] = useState(false);

  const addNewSurveyComponent = (newComponentData: NewSurveyProps) => {
    const newQuestions = [...surveyQuestions, newComponentData];
    setSurveyQuestions(newQuestions);
    setIsNewSurvey(false);
  };

  const fetchSurvey = async () => {
    const { data } = await api.get(`/survey/management/option/${surveyId}`);
    return data;
  };

  const { data, refetch } = useQuery(["new-survey"], fetchSurvey, {
    onSuccess: (data) => {
      const formattedQuestions = data.map((item: any) => ({
        id: item.surveyQuestion.id,
        title: item.surveyQuestion.content,
        type: item.surveyQuestion.questionType,
        choices: item.options.map((option: any) => option.answer),
        count: item.surveyQuestion.maxText,
        page: item.surveyQuestion.page,
        required: item.surveyQuestion.required,
        surveyId: item.surveyQuestion.surveyId,
        questionOrder: item.surveyQuestion.questionOrder,
        options: item.options.map((option: any) => ({
          id: option.id,
          answer: option.answer,
        })),
      }));
      setSurveyQuestions(formattedQuestions);
    },
  });
  console.log("설문 전체 데이터:", data);

  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editData, setEditData] = useState<NewSurveyProps | null>(null);

  const addNewPage = () => {
    const currentPageQuestions = surveyQuestions.filter(
      (question) => question.page === currentPage + 1
    );

    if (currentPageQuestions.length > 0) {
      const newPageNumber =
        Math.max(...surveyQuestions.map((q) => q.page || 0)) + 1;

      setCurrentPage(newPageNumber - 1);
    }
  };

  const handleDeleteSurvey = async (surveyQuestion: NewSurveyProps) => {
    try {
      // 해당 질문에 연결된 options를 가져옴, 객관식이 아니면 []로
      const options = surveyQuestion.options || [];
      const formattedOptions = options.map((option) => ({
        beforeChangeSurveyQuestionOptionList: {
          id: option.id,
          answer: option.answer,
        },
        afterChangeSurveyQuestionOptionList: {
          id: option.id,
          answer: option.answer,
          deleteFlag: true, // 옵션 삭제
          creationFlag: false,
        },
      }));

      const response = await api.post(`/survey/question-options`, {
        surveyQuestion: {
          id: surveyQuestion.id,
          surveyId: surveyQuestion.surveyId,
          questionType: surveyQuestion.type,
          content: surveyQuestion.title,
          page: surveyQuestion.page,
          questionOrder: surveyQuestion.questionOrder,
          maxText: surveyQuestion.count,
          required: surveyQuestion.required,
          deleted: true, // 설문 질문 삭제
        },
        options: formattedOptions,
      });

      if (response.status === 200) {
        refetch();
      }
    } catch (error) {
      console.error("네트워크 에러. 나중에 다시 시도해주세요", error);
    }
  };

  const onSaveEdit = async (updatedData: NewSurveyProps) => {
    try {
      const existingQuestion = surveyQuestions[editIndex!];

      const formattedOptions =
        updatedData.choices?.map((choice, index) => ({
          beforeChangeSurveyQuestionOptionList: existingQuestion.options![index]
            ? {
                id: existingQuestion.options![index].id,
                answer: existingQuestion.options![index].answer,
              }
            : { id: 0, answer: "" },
          afterChangeSurveyQuestionOptionList: {
            id: existingQuestion.options![index]
              ? existingQuestion.options![index].id
              : 0,
            answer: choice,
            deleteFlag: false,
            creationFlag: !existingQuestion.options![index],
          },
        })) || [];

      await api.post("/survey/question-options", {
        surveyQuestion: {
          id: existingQuestion.id,
          surveyId: surveyId,
          questionType: updatedData.type,
          content: updatedData.title,
          page: currentPage + 1,
          questionOrder: 0, // 필요한 값 설정
          maxText: updatedData.count || 0, // 필요한 값 설정
          required: existingQuestion.required,
          deleted: false,
        },
        options: formattedOptions,
      });

      const updatedQuestions = [...surveyQuestions];
      updatedQuestions[editIndex!] = updatedData;
      setSurveyQuestions(updatedQuestions);
      setEditIndex(null);
    } catch (error) {
      console.error("질문 수정 중 오류가 발생했습니다:", error);
    }
  };

  const goToNextPage = () => {
    if (currentPage < Math.max(...surveyQuestions.map((q) => q.page || 0))) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const deleteCurrentPage = () => {
    const updatedQuestions = surveyQuestions.filter(
      (question) => question.page !== currentPage + 1
    );
    setSurveyQuestions(updatedQuestions);
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : 0));
    setAlertDialog((prev) => !prev);
  };

  const [showRecommendation, setShowRecommendation] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [questions, setQuestions] = useState([]);

  const fetchChatGPTResponse = async (title: string | null) => {
    setIsLoading(true);
    const prompt = `"${title}"에 대한 설문조사에 추천할만한 짧은 질문 세 개만 추천해봐. 따옴표를 붙이지 말고 한국어로 부탁해.`;
    try {
      const response = await fetch("/api/chatgpt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: prompt }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error from /api/chatgpt:", errorData);
        throw new Error(errorData.error || "Unknown error");
      }

      const data = await response.json();

      if (data && data.answers && data.answers[0]) {
        const splitQuestions = data.answers[0].split("\n");
        setQuestions(splitQuestions);
      } else {
        console.error("유효하지 않은 데이터 : ", data);
        setQuestions([]);
      }
    } catch (error) {
      console.error(
        "네트워크가 오류가 발생했어요. 나중에 다시 시도해주세요",
        error
      );
      setQuestions([]);
    } finally {
      setIsLoading(false);
    }
  };

  const onGptRecommendationClick = () => {
    fetchChatGPTResponse(surveyTitle);
  };

  const [showGTP, setShowGPT] = useState(false);
  const addGPTClick = () => {
    if (selectedQuestion) {
      setShowGPT(false);
      setIsNewSurvey(true);
    }
  };

  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const handleSelectQuestion = (question: any) => {
    setSelectedQuestion(question);
  };

  const queryClient = useQueryClient();
  const saveSurvey = () => {
    setSaveDialog((prev) => !prev);
  };

  const onSaveClick = () => {
    localStorage.removeItem("surveyTitle");
    setSurveyId("");
    queryClient.invalidateQueries("my-surveys");
    router.push("/my-survey");
  };

  return (
    <>
      <TopBar
        title={surveyTitle!}
        hasBack
        onLeftClick={() => {
          setShowCloseDialog((prev) => !prev);
        }}
      />
      <div className="white-screen flex-col pt-14 justify-start">
        <div className="inner-screen pb-20">
          <div className="sm-gray-9-text text-base py-6 pl-6 self-start">
            {`${currentPage + 1} 페이지`}
          </div>
          {surveyQuestions
            .filter((question) => question.page === currentPage + 1)
            .map((componentData, index) =>
              editIndex === index ? (
                <EditSurvey
                  key={index}
                  initialData={editData!}
                  onSave={onSaveEdit}
                  onCancel={() => setEditIndex(null)}
                  refetch={refetch}
                  setEditIndex={setEditIndex}
                  currentPage={currentPage}
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
                  onDelete={() => handleDeleteSurvey(componentData)}
                />
              )
            )}

          {isNewSurvey && (
            <MakeSurvey
              addNewSurveyComponent={addNewSurveyComponent}
              onCancel={() => setIsNewSurvey(false)}
              title={selectedQuestion}
              setIsNewSurvey={setIsNewSurvey}
              page={currentPage + 1}
            />
          )}

          {alertDialog && (
            <Dialog
              title={alertText}
              leftText="취소"
              rightText="삭제"
              onLeftClick={() => {
                setAlertDialog((prev) => !prev);
              }}
              onRightClick={deleteCurrentPage}
              isDelete={true}
            />
          )}
          {saveDialog && (
            <Dialog
              title={"설문이 저장되었어요"}
              rightText={"이동"}
              onlyOneBtn
              onRightClick={onSaveClick}
            />
          )}
          {showCloseDialog && (
            <>
              <Dialog
                title={
                  <>
                    {"설문 제작을 그만 두시겠습니까?"}
                    <br />
                    {"진행과정은 저장돼요"}
                  </>
                }
                leftText="취소"
                onLeftClick={() => {
                  queryClient.invalidateQueries("my-surveys");
                  setShowCloseDialog((prev) => !prev);
                }}
                rightText="예"
                onRightClick={() => {
                  queryClient.invalidateQueries("my-surveys");
                  router.back();
                }}
                isDelete={true}
              />
            </>
          )}

          {showRecommendation && (
            <>
              <Overlay onClick={() => {}} />
              <div className="card fixed bg-white flex-grow justify-around flex-col gap-6 z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-auto">
                <span className="whitespace-nowrap sm-gray-9-text text-base">
                  ChatGPT가 질문을 추천해드려요! <br />
                  추천을 받으시겠어요?
                </span>
                <div className="w-full flex gap-4">
                  <button
                    onClick={() => {
                      setShowRecommendation(false);
                    }}
                    className="long-button bg-white text-gray-5 border-gray-5 w-full"
                  >
                    아니요
                  </button>
                  <button
                    onClick={() => {
                      setShowRecommendation(false);
                      onGptRecommendationClick();
                      setShowGPT(true);
                    }}
                    className="long-button primary-btn-style w-full"
                  >
                    예
                  </button>
                </div>
              </div>
            </>
          )}

          {showGTP && (
            <>
              <Overlay onClick={() => {}} />
              <div className="card justify-center fixed bg-white flex-col gap-6 z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5">
                <span className="whitespace-nowrap sm-gray-9-text text-base">
                  이런 질문은 어떠세요? <br /> ChatGPT가 질문을 추천해드려요!
                  <div className="whitespace-nowrap sm-gray-9-text text-base pt-2">
                    마음에 드는 질문을 선택할 수 있어요!
                  </div>
                </span>
                {isLoading ? (
                  <div>로딩 중...</div>
                ) : (
                  <div className="flex flex-col gap-4">
                    {questions.map((question, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div
                          className={`check-box min-w-4 ${
                            selectedQuestion === question
                              ? "bg-[#6E7CF2]"
                              : "bg-white border border-gray-7"
                          }`}
                          onClick={() => handleSelectQuestion(question)}
                        />
                        <div className="text-gray-9 text-sm font-medium">
                          {question}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
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

      {editIndex === null && !isNewSurvey && (
        <SurveyTabBar
          setIsNewSurvey={setIsNewSurvey}
          addNewPage={addNewPage}
          goToPrevPage={goToPrevPage}
          goToNextPage={goToNextPage}
          saveSurvey={saveSurvey}
          canAddPage={
            surveyQuestions.filter((q) => q.page === currentPage + 1).length > 0
          }
          setSelectedQuestion={setSelectedQuestion}
        />
      )}
    </>
  );
}
