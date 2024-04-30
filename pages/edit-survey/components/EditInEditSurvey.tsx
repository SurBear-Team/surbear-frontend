import { Dialog } from "@/pages/components/Dialog";
import { MyCheckBox } from "@/pages/components/MyCheckBox";
import { TypeDropDown } from "@/pages/my-survey/components/TypeDropDown";
import { NewSurveyProps } from "@/pages/my-survey/new-survey";
import { ShortAnswerType } from "@/pages/my-survey/new-survey/components/ShortAnswerQuestion";
import { useState } from "react";
import { MinusIcon } from "@/pages/components/styles/Icons";
import api from "@/pages/api/config";

interface EditSurveyProps {
  initialData: {
    id: number;
    surveyId: number;
    type: string;
    title: string;
    page: number;
    order: number;
    count: number;
    required: boolean;
    options: Array<{
      id: number;
      answer: string;
    }>;
    choices?: string[];
  };
  onSave: (updatedData: NewSurveyProps) => void;
  onCancel: () => void;
  refetch: () => void;
  setEditIndex: (index: number | null) => void;
}

export const EditInEditSurvey = ({
  initialData,
  onSave,
  onCancel,
  refetch,
  setEditIndex,
}: EditSurveyProps) => {
  const typeList = [
    "객관식 - 단일 선택",
    "객관식 - 다중 선택",
    "단답형",
    "슬라이더",
    "주관식",
  ];

  // 한글 - 영어 매핑하기
  const typeMapping: { [key: string]: string } = {
    "객관식 - 단일 선택": "SINGLE_CHOICE",
    "객관식 - 다중 선택": "MULTIPLE_CHOICE",
    단답형: "SHORT_ANSWER",
    슬라이더: "SLIDER",
    주관식: "SUBJECTIVE",
  };

  // 카테고리 보이기
  const [showType, setShowType] = useState(false);
  const [typeType, setTypeType] = useState(initialData?.type);

  // (객관식) 답변들 배열, 처음엔 빈 답변 2개
  const [choices, setChoices] = useState(initialData?.choices);

  // 객, 단, 슬 선택하는 함수
  const handleTypeSelect = (selectedTypeType: string) => {
    setTypeType(selectedTypeType);
    setShowType(false);
    if (
      selectedTypeType === "객관식 - 단일 선택" ||
      selectedTypeType === "객관식 - 다중 선택"
    ) {
      if (!choices || choices.length < 2) {
        setChoices(["", ""]); // 객관식 선택 시 최소 2개의 빈 답변으로 초기화
      }
    } else {
      setChoices([]); // 객관식이 아닌 경우 선택지를 비움
    }
  };

  // (공통) 필수 답변 체크 박스
  const [isChecked, setIsChecked] = useState(false);
  const handleCheckboxChange = () => {
    setIsChecked((isChecked) => !isChecked);
  };

  // (공통) 다이얼로그
  const [alertDialog, setAlertDialog] = useState(false);
  const [alertText, setAlertText] = useState("");

  // (공통) 원래 질문 제목
  const [questionTitle, setQuestionTitle] = useState(initialData?.title);

  // (단답형, 주관식) 최대 글자 수
  const [count, setCount] = useState(initialData?.count);

  // (객관식) 답변 삭제 다이얼로그
  const [deleteQuestionDialog, setDeleteQuestionDialog] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);
  // (객관식) 답변 삭제 다이얼로그에 값 전달
  const showDeleteConfirmation = (index: number) => {
    setDeleteQuestionDialog(true); // 다이얼로그 열기
    setDeleteIndex(index); // 선택한 index 전달
  };
  // (객관식) 답변 삭제
  const handleDeleteQuestion = async (optionIndex: number) => {
    const optionToDelete = initialData.options[optionIndex];
    try {
      const response = await api.post(`/survey/question-options`, {
        surveyQuestion: {
          id: initialData.id,
          surveyId: initialData.surveyId,
          questionType: typeMapping[initialData.type],
          content: initialData.title,
          page: initialData.page,
          questionOrder: initialData.order,
          maxText: initialData.count,
          required: initialData.required,
          deleted: false, // 답변만 삭제라서 질문 삭제는 false
        },
        options: [
          {
            beforeChangeSurveyQuestionOptionList: {
              id: optionToDelete.id,
              answer: optionToDelete.answer,
            },
            afterChangeSurveyQuestionOptionList: {
              id: optionToDelete.id,
              answer: optionToDelete.answer,
              deleteFlag: true, // 이걸 true로 답변 삭제
              creationFlag: false,
            },
          },
        ],
      });

      if (response.status === 200) {
        setEditIndex(null); // editIndex를 null로 설정
        refetch(); // 데이터 다시 가져오기
      }
    } catch (error) {
      console.error("Failed to delete answer: ", error);
    }
    setDeleteQuestionDialog(false);
  };

  return (
    <div className="bg-gray-1 flex flex-col justify-center h-auto p-6 w-full">
      <div className="sm-gray-9-text text-base pb-4">질문 수정</div>
      {/* 형식 필수답변 */}
      <div className="flex justify-center items-center gap-4">
        <div className="flex gap-4 w-full items-center">
          {/* 형식 고르기 */}
          <div className="sm-gray-9-text text-base whitespace-nowrap">형식</div>
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
          onChange={(e) => setQuestionTitle(e.target.value)}
          placeholder="제목을 입력해주세요"
        />
      </div>

      {/* 답변들 */}
      {(typeType === "객관식 - 단일 선택" ||
        typeType === "객관식 - 다중 선택") && (
        <>
          {/* 회색선 */}
          <div className="gray-line my-8" />
          {choices?.map((choice: string, index: number) => (
            <div key={index} className="flex flex-col gap-1">
              <div className="sm-gray-9-text text-base pt-2">
                답변 {index + 1}
              </div>
              <input
                className="main-input text-gray-9"
                value={choice}
                onChange={(e) => {}}
                placeholder="답변을 입력해주세요"
              />
              <div className="flex gap-2 justify-end">
                <div
                  onClick={() => showDeleteConfirmation(index)}
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
        </>
      )}

      {(typeType === "단답형" || typeType === "주관식") && (
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

      {/* 취소 수정 */}
      <div className="flex justify-end p-0 mt-6 gap-2">
        <button
          onClick={onCancel}
          className="small-Btn w-auto bg-white text-gray-5 border-gray-5"
        >
          취소
        </button>
        <>
          {!(
            typeType === "객관식 - 단일 선택" ||
            typeType === "객관식 - 다중 선택"
          ) && (
            <button
              onClick={() => {}}
              className="small-Btn w-auto white-bg-primary-btn"
            >
              저장
            </button>
          )}
        </>
      </div>

      <div className="flex justify-center items-center">
        {alertDialog && (
          <Dialog
            title={alertText}
            onlyOneBtn={true}
            rightText={"닫기"}
            onRightClick={() => {
              setAlertDialog((prev) => !prev);
            }}
          />
        )}

        {deleteQuestionDialog && (
          <Dialog
            title="해당 질문을 삭제하시겠습니까?"
            rightText="예"
            onRightClick={() => handleDeleteQuestion(deleteIndex!)}
            leftText="취소"
            onLeftClick={() => setDeleteQuestionDialog(false)}
            isDelete
          />
        )}
      </div>
    </div>
  );
};