import api from "@/api/config";
import { Dialog } from "@/components/Dialog";
import { TopBar } from "@/components/TopBar/TopBar";
import { Overlay } from "@/components/styles/Overlay";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { useRecoilState } from "recoil";
import { surveyIdAtom } from "../surveyState";
import { CreatedQuestion } from "./components/CreatedQuestion";
import { EditSurvey } from "./components/EditSurvey";
import { MakeSurvey } from "./components/MakeSurvey";
import { SurveyTabBar } from "./components/SurveyTabBar";

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

interface SurveyData {
  surveyQuestion: {
    id: number;
    surveyId: number;
    questionType: string;
    content: string;
    page: number;
    questionOrder: number;
    maxText: number;
    required: boolean;
  };
  options: { id: number; answer: string }[];
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

  const { data, refetch } = useQuery<SurveyData[]>(
    ["new-survey"],
    fetchSurvey,
    {
      onSuccess: (data) => {
        const formattedQuestions = data.map((item) => ({
          id: item.surveyQuestion.id,
          title: item.surveyQuestion.content,
          type: item.surveyQuestion.questionType,
          choices: item.options.map((option) => option.answer),
          count: item.surveyQuestion.maxText,
          page: item.surveyQuestion.page,
          required: item.surveyQuestion.required,
          surveyId: item.surveyQuestion.surveyId,
          questionOrder: item.surveyQuestion.questionOrder,
          options: item.options.map((option) => ({
            id: option.id,
            answer: option.answer,
          })),
        }));
        setSurveyQuestions(formattedQuestions);
      },
    }
  );

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

  const [showRecommendation, setShowRecommendation] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [questions, setQuestions] = useState([]);

  const fetchChatGPTResponse = async (title: string | null) => {
    setIsLoading(true);
    const prompt = `"${title}"에 대한 설문조사에 추천할만한 짧은 질문 세 개만 추천해봐. 따옴표와 번호를 붙이지 말고 한국어로 부탁해.`;
    try {
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: prompt }],
            n: 1,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("OpenAI API에서 에러 발생:", errorData);
        throw new Error(errorData.error || "Unknown error");
      }

      const data = await response.json();
      console.log("API 응답 데이터:", data); // 응답 데이터 출력

      if (data && data.choices && data.choices[0]) {
        const splitQuestions = data.choices[0].message.content.split("\n");
        setQuestions(splitQuestions);
      } else {
        console.error("유효하지 않은 데이터:", data);
        setQuestions([]);
      }
    } catch (error) {
      console.error(
        "네트워크 오류가 발생했습니다. 나중에 다시 시도해주세요",
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

  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);
  const handleSelectQuestion = (question: string) => {
    setSelectedQuestion(question);
  };

  const queryClient = useQueryClient();
  const saveSurvey = () => {
    setSaveDialog((prev) => !prev);
  };

  const onSaveClick = () => {
    localStorage.removeItem("surveyTitle");
    setSurveyId("");
    localStorage.removeItem("surveyTitle");
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
          <div className="base-gray-9-text py-6 pl-6 self-start">
            {`${currentPage + 1} 페이지`}
          </div>
          {surveyQuestions
            .filter((question) => question.page === currentPage + 1)
            .map((componentData, index) =>
              editIndex === index ? (
                <EditSurvey
                  key={index}
                  initialData={editData!}
                  onCancel={() => setEditIndex(null)}
                  refetch={refetch}
                  setEditIndex={setEditIndex}
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
                  setShowCloseDialog((prev) => !prev);
                }}
                rightText="예"
                onRightClick={() => {
                  queryClient.invalidateQueries("my-surveys");
                  localStorage.removeItem("surveyTitle");
                  router.back();
                }}
                isDelete={true}
              />
            </>
          )}

          {showRecommendation && (
            <>
              <Overlay onClick={() => {}} />
              <div className="card fixed bg-white flex-grow justify-around flex-col gap-6 z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 max-w-lg">
                <span className="whitespace-nowrap base-gray-9-text">
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
              <div className="card justify-center fixed bg-white flex-col gap-6 z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 max-w-lg">
                <span className="whitespace-nowrap base-gray-9-text">
                  이런 질문은 어떠세요? <br /> ChatGPT가 질문을 추천해드려요!
                  <div className="whitespace-nowrap base-gray-9-text pt-2">
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
                          className={`check-box relative flex items-center justify-center rounded-full min-w-4 border border-gray-7}`}
                          onClick={() => handleSelectQuestion(question)}
                        >
                          {selectedQuestion === question && (
                            <div className="w-2 h-2 rounded-full absolute bg-primary-1" />
                          )}
                        </div>
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
