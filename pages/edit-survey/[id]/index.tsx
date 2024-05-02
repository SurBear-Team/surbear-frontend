import api from "@/pages/api/config";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { useRecoilValue } from "recoil";
import { editSurveyTitleAtom } from "../editSurveyState";
import { useEffect, useState } from "react";
import { TopBar } from "@/pages/components/TopBar/TopBar";
import { CreatedQuestion } from "@/pages/my-survey/new-survey/components/CreatedQuestion";
import { Dialog } from "@/pages/components/Dialog";
import { TabButton } from "@/pages/my-survey/new-survey/components/SurveyTabBar";
import { EditInEditSurvey } from "../components/EditInEditSurvey";
import { TypeDropDown } from "@/pages/my-survey/components/TypeDropDown";
import { MyCheckBox } from "@/pages/components/MyCheckBox";
import { ShortAnswerType } from "@/pages/my-survey/new-survey/components/ShortAnswerQuestion";
import {
  AddQuestionIcon,
  MinusIcon,
  NextPageIcon,
  PlusIcon,
  PrevPageIcon,
  SaveIcon,
} from "@/pages/components/styles/Icons";
import { NewSurveyProps } from "@/pages/my-survey/new-survey";

export interface SurveyQuestion {
  options: Array<{
    id: number;
    answer: string;
  }>;
  id: number;
  content: string;
  page: number;
  questionType: string;
  maxText?: number;
  surveyId: number;
  questionOrder?: number;
  required: boolean;
}

export interface SurveyData {
  surveyQuestion: SurveyQuestion;
  options: Array<{
    id: number;
    answer: string;
  }>;
}

export default function EditSurveyPage() {
  const router = useRouter();
  const { id: surveyId } = router.query; // 현재 id 가져오기
  const surveyTitle = useRecoilValue(editSurveyTitleAtom); // recoil로 가져온 제목

  const [isNewSurvey, setIsNewSurvey] = useState(false); // 새 설문 만들기 창

  const [alertDialog, setAlertDialog] = useState(false); // 다이얼로그
  const [alertText, setAlertText] = useState("");
  const [showCloseDialog, setShowCloseDialog] = useState(false); // 뒤로가기 누르면
  const [saveDialog, setSaveDialog] = useState(false); // 저장하기 누르면

  // (공통) 설문 삭제 다이얼로그 부분
  const [deleteSurveyDialog, setDeleteSurveyDialog] = useState(false);
  const [selectedSurveyQuestion, setSelectedSurveyQuestion] =
    useState<SurveyQuestion | null>(null);
  // 다이얼로그에 값 전달하기
  const showDeleteConfirmation = (surveyQuestion: SurveyQuestion) => {
    setSelectedSurveyQuestion(surveyQuestion); // 삭제할 질문
    setDeleteSurveyDialog(true);
  };

  const typeList = [
    "객관식 - 단일 선택",
    "객관식 - 다중 선택",
    "단답형",
    "슬라이더",
    "주관식",
  ];

  // 영어 - 한글 매핑하기
  const typeMapping: { [key: string]: string } = {
    SINGLE_CHOICE: "객관식 - 단일 선택",
    MULTIPLE_CHOICE: "객관식 - 다중 선택",
    SHORT_ANSWER: "단답형",
    SLIDER: "슬라이더",
    SUBJECTIVE: "주관식",
  };

  // 한글 - 영어 매핑하기
  const KorToEngTypeMapping: { [key: string]: string } = {
    "객관식 - 단일 선택": "SINGLE_CHOICE",
    "객관식 - 다중 선택": "MULTIPLE_CHOICE",
    단답형: "SHORT_ANSWER",
    슬라이더: "SLIDER",
    주관식: "SUBJECTIVE",
  };

  // 객, 단, 슬 선택하는 함수
  const handleTypeSelect = (selectedTypeType: string) => {
    setTypeType(selectedTypeType);
    setShowType(false);
    const englishType =
      KorToEngTypeMapping[selectedTypeType] || "SINGLE_CHOICE";
    setNowType(englishType);
  };

  // 기존 설문 데이터 가져오기
  const fetchSurvey = async () => {
    const { data } = await api.get(`/survey/management/option/${surveyId}`);
    return data;
  };
  const { data, refetch } = useQuery<SurveyData[]>(
    ["editSurvey", surveyId],
    fetchSurvey,
    {
      enabled: !!surveyId,
    }
  );

  // 현재 페이지
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1); // 마지막 페이지
  // 현재 페이지의 질문 목록
  const [currentPageData, setCurrentPageData] = useState<SurveyData[]>([]);

  // 현재 페이지의 설문만 보이게
  useEffect(() => {
    if (data) {
      const pages = data.map((item) => item.surveyQuestion.page);
      const lastPage = Math.max(...pages); // 최대 페이지 계산
      setMaxPage(lastPage);
      const filteredData = data.filter(
        (item) => item.surveyQuestion.page === currentPage
      );
      setCurrentPageData(filteredData);
    }
  }, [data, currentPage]);

  const goToNextPage = () => {
    if (currentPage < maxPage) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      // 첫 페이지보다 클 때만 이전 페이지로 이동 가능
      setCurrentPage((prev) => prev - 1);
    }
  };

  // (공통) 설문 수정하기
  const [editIndex, setEditIndex] = useState<number | null>(null);

  // CreatedQuestion에서 수정하기 버튼 누르면 받아오는거
  const handleEdit = (index: number | null) => {
    setEditIndex(index);
  };

  // (공통) 질문 삭제
  const handleDeleteSurvey = async (surveyQuestion: SurveyQuestion) => {
    try {
      const options = surveyQuestion.options || [];
      const formattedOptions = options.map(
        (option: { id: number; answer: string }) => ({
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
        })
      );

      const response = await api.post(`/survey/question-options`, {
        surveyQuestion: {
          id: surveyQuestion.id,
          surveyId: surveyQuestion.surveyId,
          questionType: surveyQuestion.questionType,
          content: surveyQuestion.content,
          page: surveyQuestion.page,
          questionOrder: surveyQuestion.questionOrder,
          maxText: surveyQuestion.maxText,
          required: surveyQuestion.required,
          deleted: true, // 설문 질문 삭제
        },
        options: formattedOptions,
      });
      if (response.status === 200) {
        refetch();
      }
    } catch (error) {
      console.error(error);
    }
  };

  // 설문조사 저장 버튼
  const saveSurvey = () => {
    setSaveDialog((prev) => !prev);
  };
  const onSaveClick = () => {
    localStorage.removeItem("surveyTitle");
    router.push("/my-survey");
  };

  // (공통) 새 질문 만들기
  const [showType, setShowType] = useState(false);
  const [typeType, setTypeType] = useState("객관식 - 단일 선택");
  const [nowType, setNowType] = useState("SINGLE_CHOICE");

  // 필수 답변 체크 박스
  const [isChecked, setIsChecked] = useState(false);
  const handleCheckboxChange = () => {
    setIsChecked((isChecked) => !isChecked);
  };

  // (공통) 질문 제목
  const [questionTitle, setQuestionTitle] = useState("");

  const handleTitleChange = (e: any) => {
    setQuestionTitle(e.target.value);
  };

  // (객관식) 답변들 배열, 처음엔 빈 답변 2개
  const [choices, setChoices] = useState(["", ""]);
  const addChoice = () => {
    setChoices([...choices, ""]);
  };

  // (객관식) 답변 삭제
  const deleteChoice = (index: number) => {
    // 2개 이상일 때만 삭제
    if (choices.length > 2) {
      const newChoices = choices.filter((_, i) => i !== index);
      setChoices(newChoices);
    } else {
      setAlertDialog(true);
      setAlertText("답변은 최소 2개");
    }
  };

  // (객관식) 답변 onChange
  const handleChoiceChange = (index: number, newText: string) => {
    const updatedChoices = choices.map((choice, choiceIndex) => {
      if (index === choiceIndex) {
        return newText; // 선택된 답변의 텍스트 업데이트
      }
      return choice;
    });
    setChoices(updatedChoices); // 변경된 답변 배열로 업데이트
  };

  // (단답형) 최대 글자 수
  const [count, setCount] = useState(7883);

  // (공통)페이지
  const [surveyPages, setSurveyPages] = useState<NewSurveyProps[][]>([[]]);

  // (공통) 설문 만들기
  const addNewSurveyComponent = (newComponentData: any) => {
    let newPages = [...surveyPages];

    // 현재 페이지에 배열이 초기화되었는지 확인하고 필요하면 초기화
    if (!newPages[currentPage]) {
      newPages[currentPage] = [];
    }
    newPages[currentPage] = [...newPages[currentPage], newComponentData];
    setSurveyPages(newPages);
    setIsNewSurvey(false);
  };

  // ///
  const onSaveNewQuestion = () => {
    const isTitleEmpty = !questionTitle.trim();
    if (isTitleEmpty) {
      setAlertDialog(true);
      setAlertText("제목을 입력해주세요.");
      return; // 함수 중단
    }
    console.log(nowType);
    // (객관식)
    if (
      typeType === "객관식 - 단일 선택" ||
      typeType === "객관식 - 다중 선택"
    ) {
      const multipleChoiceSurveyData = {
        type: typeType,
        title: questionTitle,
        choices: choices,
      };

      addNewSurveyComponent(multipleChoiceSurveyData);
    }
    // (단답형)
    else if (typeType === "단답형" || typeType === "주관식") {
      const shortAnswerSurveyData = {
        type: typeType,
        title: questionTitle,
        count: count,
        choices: [],
      };
      addNewSurveyComponent(shortAnswerSurveyData);
    }
    // (슬라이더)
    else if (typeType === "슬라이더") {
      const sliderSurveyData = {
        type: typeType,
        title: questionTitle,
        choices: [],
      };
      addNewSurveyComponent(sliderSurveyData);
    }

    api
      .post("/survey/question", {
        answers:
          typeType === "객관식 - 단일 선택" || typeType === "객관식 - 다중 선택"
            ? choices
            : [],
        surveyQuestion: {
          surveyId: surveyId,
          questionType: nowType,
          content: questionTitle,
          page: currentPage,
          questionOrder: 0, // ㅇㅅㅇ?
          maxText: count, // 임시
          required: isChecked,
        },
      })
      .then(() => {
        // 저장 후 입력 필드 초기화
        setQuestionTitle("");
        setChoices(["", ""]);
        refetch();
      });
  };
  // 콘솔 찍기
  useEffect(() => {
    console.log(data);
  }, []);

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
            {`${currentPage} 페이지`}
          </div>
          {currentPageData.map((item, index) =>
            editIndex === index ? (
              <EditInEditSurvey
                key={index}
                initialData={{
                  id: item.surveyQuestion.id,
                  surveyId: item.surveyQuestion.surveyId,
                  page: item.surveyQuestion.page,
                  order: item.surveyQuestion.questionOrder ?? 0, // order가 없으면 0
                  title: item.surveyQuestion.content,
                  type: typeMapping[item.surveyQuestion.questionType],
                  choices: item.options.map((option) => option.answer),
                  count: item.surveyQuestion.maxText ?? 0, // count가 없으면 0
                  required: item.surveyQuestion.required,
                  options: item.options.map((option) => ({
                    id: option.id,
                    answer: option.answer,
                  })),
                }}
                onCancel={() => setEditIndex(null)}
                refetch={refetch}
                setEditIndex={setEditIndex}
                currentPage={currentPage}
              />
            ) : (
              <CreatedQuestion
                key={index}
                answerIndex={index + 1}
                type={typeMapping[item.surveyQuestion.questionType]}
                title={item.surveyQuestion.content}
                answerList={item.options.map((option) => option.answer)}
                count={item.surveyQuestion.maxText}
                onEdit={() => handleEdit(index)}
                onDelete={() => showDeleteConfirmation(item.surveyQuestion)}
                onOrderChange={() => {}}
              />
            )
          )}

          {/* 새 질문 생성 */}
          {isNewSurvey && (
            <div className="bg-gray-1 flex flex-col justify-center h-auto p-6 w-full">
              <div className="sm-gray-9-text text-base pb-4">
                새 질문 만들기
                {/* 형식 필수답변 */}
                <div className="flex justify-center items-center gap-4">
                  <div className="flex gap-4 w-full items-center">
                    {/* 형식 고르기 */}
                    <div className="sm-gray-9-text text-base whitespace-nowrap">
                      형식
                    </div>
                    <TypeDropDown
                      onShowTypeClick={() => {
                        setShowType((prev) => !prev);
                      }}
                      showType={showType}
                      typeType={typeType}
                      typeList={typeList}
                      onTypeSelect={handleTypeSelect}
                    />
                  </div>

                  <div className="flex gap-1 items-center">
                    <div className="sm-gray-9-text text-base whitespace-nowrap">
                      필수 답변
                    </div>
                    <MyCheckBox
                      isChecked={isChecked}
                      onCheckClick={handleCheckboxChange}
                    />
                  </div>
                </div>
                {/* 질문 제목 */}
                <div className="flex flex-col gap-1">
                  <div className="sm-gray-9-text text-base pt-2">질문 제목</div>
                  <input
                    className="main-input text-gray-9"
                    value={questionTitle}
                    onChange={handleTitleChange}
                    placeholder="제목을 입력해주세요"
                  />
                </div>
                {/* 답변들 */}
                {(typeType === "객관식 - 단일 선택" ||
                  typeType === "객관식 - 다중 선택") && (
                  <>
                    {/* 회색선 */}
                    <div className="gray-line my-8" />
                    <>
                      {choices?.map((choice, index) => (
                        <div key={index} className="flex flex-col gap-1">
                          <div className="sm-gray-9-text text-base pt-2">
                            답변 {index + 1}
                          </div>
                          <input
                            className="main-input text-gray-9"
                            onChange={(e) => {
                              handleChoiceChange(index, e.target.value);
                            }}
                            placeholder="답변을 입력해주세요"
                          />

                          <div className="flex gap-2 justify-end">
                            <div
                              onClick={() => {
                                deleteChoice(index);
                              }}
                              className="flex items-center gap-1 cursor-pointer"
                            >
                              <MinusIcon />
                              <div className="text-red-1 font-semibold text-sm">
                                답변 삭제
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                      {/* 새 답변 추가 버튼 */}
                      <button
                        className="medium-Btn white-bg-primary-btn  w-auto mx-auto mt-6 flex items-center gap-1"
                        onClick={addChoice}
                      >
                        <PlusIcon /> 새 답변 추가
                      </button>
                    </>
                  </>
                )}
                {typeType === "단답형" && (
                  <>
                    <ShortAnswerType setCount={setCount} />
                    <div className="gray-line mt-8" />
                  </>
                )}
                {typeType === "슬라이더" && (
                  <>
                    <div className="gray-line mt-8" />
                  </>
                )}
                <div className="flex justify-end p-0 mt-6 gap-2">
                  <button
                    onClick={() => {
                      setIsNewSurvey(false);
                    }}
                    className="small-Btn w-auto bg-white text-gray-5 border-gray-5"
                  >
                    취소
                  </button>

                  <button
                    onClick={onSaveNewQuestion}
                    className="small-Btn w-auto white-bg-primary-btn"
                  >
                    저장
                  </button>
                </div>
              </div>
            </div>
          )}

          {alertDialog && (
            <Dialog
              title={alertText}
              leftText="취소"
              rightText="삭제"
              onlyOneBtn={false}
              onLeftClick={() => {
                setAlertDialog((prev) => !prev);
              }}
              onRightClick={() => {}}
              isDelete={true}
            />
          )}

          {deleteSurveyDialog && (
            <Dialog
              title="해당 질문을 삭제하시겠어요?"
              leftText="취소"
              rightText="삭제"
              onLeftClick={() => {
                setDeleteSurveyDialog((prev) => !prev);
              }}
              onRightClick={() => {
                handleDeleteSurvey(selectedSurveyQuestion!);
                setDeleteSurveyDialog(false);
              }}
              isDelete={true}
            />
          )}

          {showCloseDialog && (
            <>
              <Dialog
                title={
                  <>
                    {"설문 수정을 그만 두시겠습니까?"}
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
                  router.back();
                }}
                isDelete={true}
              />
            </>
          )}

          {saveDialog && (
            <Dialog
              title={"설문이 저장되었어요"}
              rightText={"이동"}
              onlyOneBtn
              onRightClick={onSaveClick}
            />
          )}

          {editIndex === null && !isNewSurvey && (
            <div className="w-full flex justify-center gap-4 left-0 right-0 mx-auto px-1 bg-white fixed bottom-0">
              <div className="flex w-full max-w-xl justify-between">
                <TabButton
                  onClick={() => {
                    setIsNewSurvey((prev) => !prev);
                  }}
                  icon={<AddQuestionIcon />}
                  label="새 질문"
                />
                <TabButton
                  onClick={goToPrevPage}
                  icon={<PrevPageIcon />}
                  label="이전 페이지"
                />
                <TabButton
                  onClick={goToNextPage}
                  icon={<NextPageIcon />}
                  label="다음 페이지"
                />
                <TabButton
                  onClick={saveSurvey}
                  icon={<SaveIcon />}
                  label="설문조사 저장"
                  labelStyle="text-primary-1"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
