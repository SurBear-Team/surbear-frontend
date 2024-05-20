import api from "@/pages/api/config";
import { useRouter } from "next/router";
import { useQuery, useQueryClient } from "react-query";
import { useRecoilValue } from "recoil";
import { editSurveyTitleAtom } from "../editSurveyState";
import { useEffect, useState } from "react";
import { TopBar } from "@/pages/components/TopBar/TopBar";
import { CreatedQuestion } from "@/pages/my-survey/new-survey/components/CreatedQuestion";
import { Dialog } from "@/pages/components/Dialog";
import { EditInEditSurvey } from "../components/EditInEditSurvey";
import { TypeDropDown } from "@/pages/my-survey/components/TypeDropDown";
import { MyCheckBox } from "@/pages/components/MyCheckBox";
import { ShortAnswerType } from "@/pages/my-survey/new-survey/components/ShortAnswerQuestion";
import { MinusIcon, PlusIcon } from "@/pages/components/styles/Icons";
import { NewSurveyProps } from "@/pages/my-survey/new-survey";
import { EditTabBar } from "../components/EditTabBar";
import { SurveyData, SurveyQuestion } from "../editInterface";
import {
  korToEngTypeMapping,
  engToKorTypeMapping,
} from "@/pages/my-survey/components/typeMapping";
import { useOneBtnDialog } from "@/pages/hooks/useOneBtnDialog";

export default function EditSurveyPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { id: surveyId } = router.query; // 현재 id 가져오기
  const surveyTitle = useRecoilValue(editSurveyTitleAtom); // recoil로 가져온 제목
  // 새 설문 만들기 창
  const [isNewSurvey, setIsNewSurvey] = useState(false);

  // 원버튼 다이얼로그
  const { oneBtnDialog, showOneBtnDialog, hideOneBtnDialog } =
    useOneBtnDialog();

  const [showCloseDialog, setShowCloseDialog] = useState(false); // 뒤로가기 누르면
  const [saveDialog, setSaveDialog] = useState(false); // 저장하기 누르면
  const [count, setCount] = useState(788183); // (단답형) 최대 글자 수

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

  // 객, 단, 슬 선택하는 함수
  const handleTypeSelect = (selectedTypeType: string) => {
    setTypeType(selectedTypeType);
    setShowType(false);
    const englishType =
      korToEngTypeMapping[selectedTypeType] || "SINGLE_CHOICE";
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
    // data가 null이나 undi가 아닐 때 실행
    if (data) {
      // 각 항목에서 페이지 번호 추출해서 pages배열에 저장
      const pages = data.map((item) => item.surveyQuestion.page);
      // ...으로 배열의 모든 값을 함수의 인자로 전달하고 최대값 저장
      const lastPage = Math.max(...pages);
      setMaxPage(lastPage);
      const filteredData = data.filter(
        (item) => item.surveyQuestion.page === currentPage
      );
      setCurrentPageData(filteredData);
    }
  }, [data, currentPage]);

  // 다음 페이지
  const goToNextPage = () => {
    if (currentPage < maxPage) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  // 이전 페이지
  const goToPrevPage = () => {
    if (currentPage > 1) {
      // 첫 페이지보다 클 때만 이전 페이지로 이동 가능
      setCurrentPage((prev) => prev - 1);
    }
  };

  // (공통) 설문 수정하기
  const [editIndex, setEditIndex] = useState<number | null>(null);

  // CreatedQuestion에서 수정 버튼 누르면 받아오는거
  const handleEdit = (index: number | null) => {
    setEditIndex(index);
  };

  // (공통) 질문 삭제
  const handleDeleteSurvey = async (surveyQuestion: SurveyQuestion) => {
    try {
      // 해당 질문에 연결된 options를 가져옴, 객관식이 아니면 []로
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
      showOneBtnDialog("네트워크 에러. 나중에 다시 시도해주세요");
    }
  };

  // 설문조사 저장 버튼
  const saveSurvey = () => {
    setSaveDialog((prev) => !prev);
    queryClient.invalidateQueries("my-surveys");
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
      // 삭제하려는 인덱스를 제외한 나머지 답변들을 새로운 배열로, 요소의 값을 안받고 index만 받으므로 _ 사용
      const newChoices = choices.filter((_, i) => i !== index);
      setChoices(newChoices);
    } else {
      showOneBtnDialog("답변은 최소 2개입니다");
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

  // (공통)페이지
  const [surveyPages, setSurveyPages] = useState<NewSurveyProps[][]>([[]]);

  // (공통) 설문 만들기
  const addNewSurveyComponent = (newComponentData: any) => {
    let newPages = [...surveyPages];

    // 현재 페이지에 배열(currentPage)이 초기화되었는지 확인하고
    // 필요하면 초기화 (unde일 경우 빈 배열을 할당하여 초기화)
    if (!newPages[currentPage]) {
      newPages[currentPage] = [];
    }
    // 기존 페이지 배열을 복사하고, 끝에 새 데이터 추가
    newPages[currentPage] = [...newPages[currentPage], newComponentData];
    setSurveyPages(newPages);
    setIsNewSurvey(false);
  };

  // (공통) 새 설문 저장하기
  const onSaveNewQuestion = async () => {
    try {
      const isTitleEmpty = !questionTitle.trim();
      if (isTitleEmpty) {
        showOneBtnDialog("제목을 입력해주세요");
        return; // 함수 중단
      }

      let surveyData;
      // 카테고리 분류
      if (
        typeType === "객관식 - 단일 선택" ||
        typeType === "객관식 - 다중 선택"
      ) {
        // 중복 답변 확인
        const choiceSet = new Set(choices); // Set은 배열을 객체로 만들고, 중복된 값을 제거함
        if (choiceSet.size !== choices.length) {
          showOneBtnDialog("중복된 답변이 있습니다. 다시 확인해 주세요");
          return; // 함수 중단
        }
        surveyData = {
          type: typeType,
          title: questionTitle,
          choices: choices,
        };
      } else if (typeType === "단답형" || typeType === "주관식") {
        surveyData = {
          type: typeType,
          title: questionTitle,
          count: count,
          choices: [],
        };
      } else if (typeType === "슬라이더") {
        surveyData = {
          type: typeType,
          title: questionTitle,
          choices: [],
        };
      }
      addNewSurveyComponent(surveyData);

      const response = await api.post("/survey/question", {
        answers:
          typeType === "객관식 - 단일 선택" || typeType === "객관식 - 다중 선택"
            ? choices
            : [],
        surveyQuestion: {
          surveyId: surveyId,
          questionType: nowType,
          content: questionTitle,
          page: currentPage,
          questionOrder: 0,
          maxText: count,
          required: isChecked,
        },
      });
      if (response.status === 200) {
        // 저장 후 입력 필드 초기화
        setCount(788183);
        setQuestionTitle("");
        setChoices(["", ""]);
        refetch();
      }
    } catch (error) {
      showOneBtnDialog("네트워크 에러. 나중에 다시 시도해주세요");
    }
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
                  type: engToKorTypeMapping[item.surveyQuestion.questionType],
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
                type={item.surveyQuestion.questionType}
                title={item.surveyQuestion.content}
                answerList={item.options.map((option) => option.answer)}
                count={item.surveyQuestion.maxText}
                onEdit={() => handleEdit(index)}
                onDelete={() => showDeleteConfirmation(item.surveyQuestion)}
              />
            )
          )}

          {/* 새 질문 생성 */}
          {isNewSurvey && (
            <div className="bg-gray-1 flex flex-col justify-center h-auto p-6 w-full">
              <div className="base-gray-9-text pb-4">새 질문 만들기</div>
              {/* 형식 필수답변 */}
              <div className="flex-center gap-4">
                <div className="flex gap-4 w-full items-center">
                  {/* 형식 고르기 */}
                  <div className="base-gray-9-text whitespace-nowrap">형식</div>
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
                  <div className="base-gray-9-text whitespace-nowrap">
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
                <div className="base-gray-9-text pt-2">질문 제목</div>
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
                        <div className="base-gray-9-text pt-2">
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
                      className="medium-Btn white-bg-primary-btn w-auto mx-auto mt-6 flex items-center gap-1"
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
            <Dialog
              title={
                <>
                  {"설문 수정을 그만 두시겠습니까?"}
                  <br />
                  {"진행과정은 저장됩니다"}
                </>
              }
              leftText="취소"
              onLeftClick={() => {
                setShowCloseDialog((prev) => !prev);
              }}
              rightText="예"
              onRightClick={() => {
                router.back();
                queryClient.invalidateQueries("my-surveys");
              }}
              isDelete={true}
            />
          )}
          {/* 저장하기 누르면 나오는 다이얼로그 */}
          {saveDialog && (
            <Dialog
              title={"설문이 저장되었어요"}
              rightText={"이동"}
              onlyOneBtn
              onRightClick={onSaveClick}
            />
          )}

          {/* 원버튼 다이얼로그 */}
          {oneBtnDialog.open && (
            <Dialog
              title={oneBtnDialog.title}
              rightText="확인"
              onlyOneBtn
              onRightClick={hideOneBtnDialog}
            />
          )}
          {editIndex === null && !isNewSurvey && (
            <EditTabBar
              setIsNewSurvey={setIsNewSurvey}
              goToPrevPage={goToPrevPage}
              goToNextPage={goToNextPage}
              saveSurvey={saveSurvey}
            />
          )}
        </div>
      </div>
    </>
  );
}
