import { Dialog } from "@/pages/components/Dialog";
import { MyCheckBox } from "@/pages/components/MyCheckBox";
import { ShortAnswerType } from "@/pages/my-survey/new-survey/components/ShortAnswerQuestion";
import { useState } from "react";
import {
  MinusIcon,
  PlusIcon,
  SaveIcon,
  UpdateIcon,
} from "@/pages/components/styles/Icons";
import api from "@/pages/api/config";
import { EditSurveyProps } from "../editInterface";
import { korToEngTypeMapping } from "@/pages/my-survey/components/typeMapping";
import { useOneBtnDialog } from "@/pages/hooks/useOneBtnDialog";

export const EditInEditSurvey = ({
  initialData, // index에서 받은 기존 질문 데이터 객체
  onCancel,
  refetch,
  setEditIndex,
  currentPage,
}: EditSurveyProps) => {
  // 카테고리
  const typeType = initialData?.type;

  // (객관식) 답변들 배열, 처음엔 빈 답변 2개
  const [choices, setChoices] = useState(initialData?.choices || []);
  const [disabledInputs, setDisabledInputs] = useState(
    choices?.map(() => true) ?? []
  ); // 모든 입력을 초기에 비활성화(true)

  // (공통) 필수 답변 체크 박스
  const [isChecked, setIsChecked] = useState(false);
  const handleCheckboxChange = () => {
    setIsChecked((isChecked) => !isChecked);
  };

  // (공통) 원버튼 alert다이얼로그
  const { oneBtnDialog, showOneBtnDialog, hideOneBtnDialog } =
    useOneBtnDialog();

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

  // (객관식) 새 답변 추가 함수
  const addNewChoice = () => {
    setChoices([...choices, ""]); // 현재 답변 배열에 빈 문자열을 추가
    setDisabledInputs([...disabledInputs, false]); // 새 답변 입력 칸을 활성화 상태(false)로 설정
  };

  // (객관식) input을 enable로 하기
  const enableEdit = (index: number) => {
    setDisabledInputs(
      disabledInputs.map((disabled, idx) => (idx === index ? false : disabled))
    );
  };

  // (객관식) 각 input의 onChange
  const handleInputChange = (index: number, value: string) => {
    setChoices(choices.map((choice, idx) => (idx === index ? value : choice)));
  };

  // (객관식) 답변 저장 버튼
  const handleSaveChanges = async (optionIndex: number) => {
    // 선택한 input disable하기
    setDisabledInputs(
      // input중 idx가 optionIndex가 같은건 disable true
      disabledInputs.map((disabled, idx) =>
        idx === optionIndex ? true : disabled
      )
    );
    // 수정하고자 하는 답변의 index를 통해 값 가져오고 수정한 내용 저장
    const updatedAnswer = choices[optionIndex];
    // 해당 index에 데이터가 없을 경우, 기본값 제공. 새 답변인지 구분
    const initialOption = initialData.options[optionIndex] || {
      id: undefined,
      answer: "",
    };
    const isOptionNew = !initialOption.id; // 새 답변 추가로 만든 새로운건지(id가 unde인) 체크

    // choices배열을 순회하며 수정된 답변이 다른 항목과 중복되는지 검사. 중복이면 true
    const isDuplicate = choices.some(
      // 자기 자신을 제외한 index와 비교
      (choice, idx) => choice.trim() === updatedAnswer && idx !== optionIndex
    );
    if (isDuplicate) {
      // 중복 답변이 있는 경우
      showOneBtnDialog("중복된 답변이 있습니다. 다른 답변을 입력해주세요.");
      return; // 함수 종료
    }

    try {
      const response = await api.post(`/survey/question-options`, {
        surveyQuestion: {
          id: initialData.id,
          surveyId: initialData.surveyId,
          questionType: korToEngTypeMapping[initialData.type],
          content: initialData.title,
          page: currentPage,
          questionOrder: initialData.order,
          maxText: initialData.count,
          required: initialData.required,
          deleted: false,
        },
        options: [
          {
            beforeChangeSurveyQuestionOptionList: isOptionNew
              ? {}
              : { id: initialOption.id, answer: initialOption.answer },
            afterChangeSurveyQuestionOptionList: {
              id: initialOption.id,
              answer: updatedAnswer,
              deleteFlag: false,
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
      showOneBtnDialog("네트워크 에러. 나중에 다시 시도해주세요");
    }
  };

  // (객관식) 답변 삭제
  const handleDeleteQuestion = async (optionIndex: number) => {
    const initailOption = initialData.options[optionIndex];
    try {
      const response = await api.post(`/survey/question-options`, {
        surveyQuestion: {
          id: initialData.id,
          surveyId: initialData.surveyId,
          questionType: korToEngTypeMapping[initialData.type],
          content: initialData.title,
          page: currentPage,
          questionOrder: initialData.order,
          maxText: initialData.count,
          required: initialData.required,
          deleted: false, // 답변만 삭제라서 질문 삭제는 false
        },
        options: [
          {
            beforeChangeSurveyQuestionOptionList: {
              id: initailOption.id,
              answer: initailOption.answer,
            },
            afterChangeSurveyQuestionOptionList: {
              id: initailOption.id,
              answer: initailOption.answer,
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
      showOneBtnDialog("네트워크 에러. 나중에 다시 시도해주세요");
    }
    setDeleteQuestionDialog(false);
  };

  // (공통) 질문 제목 수정 후 저장
  const handleSaveQuestion = async () => {
    try {
      const response = await api.post(`/survey/question-options`, {
        surveyQuestion: {
          id: initialData.id,
          surveyId: initialData.surveyId,
          questionType: korToEngTypeMapping[typeType], // 질문 타입
          content: questionTitle, // 질문 제목
          page: currentPage,
          questionOrder: initialData.order,
          maxText: count, // 최대 글자수
          required: isChecked, // 필수 여부
          deleted: false,
        },
      });

      if (response.status === 200) {
        setEditIndex(null); // editIndex를 null로 설정
        refetch(); // 데이터 다시 가져오기
      }
    } catch (error) {
      showOneBtnDialog("네트워크 에러. 나중에 다시 시도해주세요");
    }
  };
  return (
    <div className="bg-gray-1 flex flex-col justify-center h-auto p-6 w-full">
      <div className="base-gray-9-text pb-4">질문 수정</div>
      {/* 형식 필수답변 */}
      <div className="flex-center gap-4">
        <div className="flex gap-4 w-full items-center">
          {/* 형식 표시 */}
          <div className="base-gray-9-text whitespace-nowrap">형식</div>
          <div className="drop-down-bar">
            <div className="sm-gray-9-text text-center w-full">{typeType}</div>
          </div>
        </div>

        <div className="flex gap-1 items-center">
          <div className="base-gray-9-text whitespace-nowrap">필수 답변</div>
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
              <div className="base-gray-9-text pt-2">답변 {index + 1}</div>
              <input
                className="main-input text-gray-9"
                value={choice}
                onChange={(e) => handleInputChange(index, e.target.value)}
                placeholder="답변을 입력해주세요"
                disabled={disabledInputs[index]}
              />

              <div className="flex gap-2 justify-end">
                {!disabledInputs[index] ? (
                  <div
                    onClick={() => handleSaveChanges(index)}
                    className="flex items-center gap-1 cursor-pointer"
                  >
                    <SaveIcon isSmall={true} />
                    <div className="text-primary-1 font-semibold text-sm">
                      답변 저장
                    </div>
                  </div>
                ) : (
                  <div
                    onClick={() => enableEdit(index)}
                    className="flex items-center gap-1 cursor-pointer"
                  >
                    <UpdateIcon />
                    <div className="text-primary-1 font-semibold text-sm">
                      답변 수정
                    </div>
                  </div>
                )}
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
          {/* 새 답변 추가 버튼 */}
          <button
            className="medium-Btn white-bg-primary-btn self-center w-auto mt-6 flex items-center gap-1"
            onClick={addNewChoice}
          >
            <PlusIcon /> 새 답변 추가
          </button>
        </>
      )}

      {(typeType === "단답형" || typeType === "주관식") && (
        <>
          <ShortAnswerType
            setCount={setCount}
            hasLimit={initialData?.count !== 788183}
            value={initialData?.count}
          />
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

        <button
          onClick={handleSaveQuestion}
          className="small-Btn w-auto white-bg-primary-btn"
        >
          저장
        </button>
      </div>

      <div className="flex-center">
        {oneBtnDialog.open && (
          <Dialog
            title={oneBtnDialog.title}
            onlyOneBtn={true}
            rightText={"닫기"}
            onRightClick={hideOneBtnDialog}
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
