import { useState } from "react";
import { Dialog } from "@/pages/components/Dialog";
import { MyCheckBox } from "@/pages/components/MyCheckBox";
import { ShortAnswerType } from "./ShortAnswerQuestion";
import {
  MinusIcon,
  PlusIcon,
  SaveIcon,
  UpdateIcon,
} from "@/pages/components/styles/Icons";
import api from "@/pages/api/config";
import { NewSurveyProps } from "..";
import { engToKorTypeMapping } from "../../components/typeMapping";
import { useOneBtnDialog } from "@/pages/hooks/useOneBtnDialog";

interface EditSurveyProps {
  initialData: NewSurveyProps;
  onCancel: () => void;
  refetch: () => void;
  setEditIndex: (index: number | null) => void;
}

export const EditSurvey = ({
  initialData,
  onCancel,
  refetch,
  setEditIndex,
}: EditSurveyProps) => {
  const typeType = initialData?.type;

  const [choices, setChoices] = useState(initialData?.choices || []);
  const [disabledInputs, setDisabledInputs] = useState(
    choices?.map(() => true) ?? []
  );

  const [isChecked, setIsChecked] = useState(initialData?.required);
  const handleCheckboxChange = () => {
    setIsChecked((isChecked) => !isChecked);
  };

  const { oneBtnDialog, showOneBtnDialog, hideOneBtnDialog } =
    useOneBtnDialog();

  const [questionTitle, setQuestionTitle] = useState(initialData?.title);
  const [count, setCount] = useState(initialData?.count);

  const [deleteQuestionDialog, setDeleteQuestionDialog] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);
  const showDeleteConfirmation = (index: number) => {
    setDeleteQuestionDialog(true);
    setDeleteIndex(index);
  };

  const addNewChoice = () => {
    setChoices([...choices, ""]);
    setDisabledInputs([...disabledInputs, false]);
  };

  const enableEdit = (index: number) => {
    setDisabledInputs(
      disabledInputs.map((disabled, idx) => (idx === index ? false : disabled))
    );
  };

  const handleInputChange = (index: number, value: string) => {
    setChoices(choices.map((choice, idx) => (idx === index ? value : choice)));
  };

  const handleSaveChanges = async (optionIndex: number) => {
    setDisabledInputs(
      disabledInputs.map((disabled, idx) =>
        idx === optionIndex ? true : disabled
      )
    );
    const updatedAnswer = choices[optionIndex];
    const initialOption =
      initialData.options && initialData.options[optionIndex]
        ? initialData.options[optionIndex]
        : { id: undefined, answer: "" };
    const isOptionNew = initialOption.id === undefined;

    const isDuplicate = choices.some(
      (choice, idx) => choice.trim() === updatedAnswer && idx !== optionIndex
    );
    if (isDuplicate) {
      showOneBtnDialog("중복된 답변이 있습니다. 다른 답변을 입력해주세요.");
      return;
    }
    if (!updatedAnswer.trim()) {
      showOneBtnDialog("답변을 모두 입력해주세요.");
      return;
    }

    const payload = {
      surveyQuestion: {
        id: initialData.id,
        surveyId: initialData.surveyId,
        questionType: initialData.type,
        content: initialData.title,
        page: initialData.page,
        questionOrder: initialData.questionOrder,
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
            creationFlag: isOptionNew,
          },
        },
      ],
    };

    console.log("Payload:", JSON.stringify(payload, null, 2));

    try {
      const response = await api.post(`/survey/question-options`, payload);

      if (response.status === 200) {
        setEditIndex(null);
        refetch();
      } else {
        console.error("질문 수정 중 오류가 발생했습니다:", response);
        showOneBtnDialog("질문 수정 중 오류가 발생했습니다.");
      }
    } catch (error) {
      console.error("질문 수정 중 오류가 발생했습니다:", error);
      showOneBtnDialog("네트워크 에러. 나중에 다시 시도해주세요.");
    }
  };

  const handleDeleteQuestion = async (optionIndex: number) => {
    const initialOption = initialData.options
      ? initialData.options[optionIndex]
      : null;
    if (!initialOption) {
      showOneBtnDialog("해당 답변을 찾을 수 없습니다.");
      return;
    }

    const payload = {
      surveyQuestion: {
        id: initialData.id,
        surveyId: initialData.surveyId,
        questionType: initialData.type,
        content: initialData.title,
        page: initialData.page,
        questionOrder: initialData.questionOrder,
        maxText: initialData.count,
        required: initialData.required,
        deleted: false,
      },
      options: [
        {
          beforeChangeSurveyQuestionOptionList: {
            id: initialOption.id,
            answer: initialOption.answer,
          },
          afterChangeSurveyQuestionOptionList: {
            id: initialOption.id,
            answer: initialOption.answer,
            deleteFlag: true,
            creationFlag: false,
          },
        },
      ],
    };

    console.log("Payload:", JSON.stringify(payload, null, 2));

    try {
      const response = await api.post(`/survey/question-options`, payload);

      if (response.status === 200) {
        setEditIndex(null);
        refetch();
      } else {
        console.error("답변 삭제 중 오류가 발생했습니다:", response);
        showOneBtnDialog("답변 삭제 중 오류가 발생했습니다.");
      }
    } catch (error) {
      console.error("답변 삭제 중 오류가 발생했습니다:", error);
      showOneBtnDialog("네트워크 에러. 나중에 다시 시도해주세요.");
    }

    setDeleteQuestionDialog(false);
  };

  const handleSaveQuestion = async () => {
    const payload = {
      surveyQuestion: {
        id: initialData.id,
        surveyId: initialData.surveyId,
        questionType: initialData.type, // 질문 타입
        content: questionTitle, // 질문 제목
        page: initialData.page,
        questionOrder: initialData.questionOrder,
        maxText: count,
        required: isChecked,
        deleted: false,
      },
    };

    console.log("Payload:", JSON.stringify(payload, null, 2));

    try {
      const response = await api.post(`/survey/question-options`, payload);

      if (response.status === 200) {
        setEditIndex(null); // editIndex를 null로 설정
        refetch(); // 데이터 다시 가져오기
      } else {
        console.error("질문 수정 중 오류가 발생했습니다:", response);
        showOneBtnDialog("질문 수정 중 오류가 발생했습니다.");
      }
    } catch (error) {
      console.error("질문 수정 중 오류가 발생했습니다:", error);
      showOneBtnDialog("네트워크 에러. 나중에 다시 시도해주세요.");
    }
  };

  return (
    <div className="bg-gray-1 flex flex-col justify-center h-auto p-6 w-full">
      <div className="base-gray-9-text pb-4">질문 수정</div>
      <div className="flex-center gap-4">
        <div className="flex gap-4 w-full items-center">
          <div className="base-gray-9-text whitespace-nowrap">형식</div>
          <div className="drop-down-bar">
            <div className="sm-gray-9-text text-center w-full">
              {engToKorTypeMapping[typeType]}
            </div>
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

      <div className="flex flex-col gap-1">
        <div className="base-gray-9-text pt-2">질문 제목</div>
        <input
          className="main-input text-gray-9"
          value={questionTitle}
          onChange={(e) => setQuestionTitle(e.target.value)}
          placeholder="제목을 입력해주세요"
        />
      </div>

      {(typeType === "SINGLE_CHOICE" || typeType === "MULTIPLE_CHOICE") && (
        <>
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
          <button
            className="medium-Btn white-bg-primary-btn self-center w-auto mt-6 flex items-center gap-1"
            onClick={addNewChoice}
          >
            <PlusIcon /> 새 답변 추가
          </button>
        </>
      )}

      {(typeType === "SHORT_ANSWER" || typeType === "SUBJECTIVE") && (
        <>
          <ShortAnswerType
            setCount={setCount}
            hasLimit={initialData?.count !== 788183}
            value={initialData?.count}
          />
          <div className="gray-line mt-8" />
        </>
      )}

      {typeType === "SLIDER" && (
        <>
          <div className="gray-line mt-8" />
        </>
      )}

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
            rightText="확인"
            onlyOneBtn
            onRightClick={hideOneBtnDialog}
          />
        )}

        {deleteQuestionDialog && (
          <Dialog
            title="해당 답변을 삭제하시겠습니까?"
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
