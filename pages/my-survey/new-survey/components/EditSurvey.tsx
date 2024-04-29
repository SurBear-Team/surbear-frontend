import { useEffect, useState } from "react";
import { CancleSaveButtonFrame } from "../../components/CancleSaveButtonFrame";
import { TypeDropDown } from "../../components/TypeDropDown";
import { MultipleChoiceQuestion } from "./MultipleChoiceQuestion";
import { ShortAnswerType } from "./ShortAnswerQuestion";
import { NewSurveyProps } from "..";
import { Dialog } from "@/pages/components/Dialog";
import { MyCheckBox } from "@/pages/components/MyCheckBox";

interface EditSurveyProps {
  initialData: NewSurveyProps;
  onSave: (updatedData: NewSurveyProps) => void;
  onCancel: () => void;
}

export const EditSurvey = ({
  initialData,
  onSave,
  onCancel,
}: EditSurveyProps) => {
  const typeList = [
    "객관식 - 단일 선택",
    "객관식 - 다중 선택",
    "단답형",
    "슬라이더",
    "주관식",
  ];

  const [showType, setShowType] = useState(false);
  const [typeType, setTypeType] = useState(initialData?.type);

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

  // 필수 답변 체크 박스
  const [isChecked, setIsChecked] = useState(false);
  const handleCheckboxChange = () => {
    setIsChecked((isChecked) => !isChecked);
  };

  const [alertDialog, setAlertDialog] = useState(false);
  const [alertText, setAlertText] = useState("");

  // (공통) 원래 질문 제목
  const [questionTitle, setQuestionTitle] = useState(initialData?.title);

  // (객관식) 답변들 배열, 처음엔 빈 답변 2개
  const [choices, setChoices] = useState(initialData?.choices);
  // (객관식) 새 답변 추가
  const addChoice = () => {
    setChoices((prevChoices = []) => [...prevChoices, ""]);
  };
  // (객관식) 답변 삭제
  const deleteChoice = (index: number) => {
    setChoices((prevChoices = []) => {
      if (prevChoices.length > 2) {
        return prevChoices.filter((_, i) => i !== index);
      } else {
        setAlertDialog(true);
        setAlertText("답변은 최소 2개입니다.");
        return prevChoices;
      }
    });
  };
  // (객관식) 중복된 답변 체크
  const [hasDuplicates, setHasDuplicates] = useState(false);

  // 객관식 답변들의 상태가 변경될 때마다 중복 체크
  useEffect(() => {
    const uniqueChoices = new Set(choices);
    setHasDuplicates(uniqueChoices.size !== choices?.length);
  }, [choices]);
  // (객관식) 답변 onChange
  const handleChoiceChange = (index: number, newText: string) => {
    setChoices((prevChoices = []) =>
      prevChoices.map((choice, choiceIndex) =>
        index === choiceIndex ? newText : choice
      )
    );
  };

  // (공통) 수정 버튼
  const onEditClick = () => {
    if (!questionTitle.trim()) {
      setAlertDialog(true);
      setAlertText("제목을 입력해주세요.");
      return;
    }

    if (
      hasDuplicates &&
      (typeType === "객관식 - 단일 선택" || typeType === "객관식 - 다중 선택")
    ) {
      setAlertDialog(true);
      setAlertText("중복된 답변이 있습니다. 다시 확인해주세요.");
      return;
    }

    // (객관식) 답변 배열에 빈 문자열이 있는지 확인
    if (typeType === "객관식" && choices?.some((choice) => !choice.trim())) {
      setAlertDialog(true);
      setAlertText("답변을 모두 입력해주세요.");
      return;
    }

    // 모든 조건을 충족시킨 경우, 수정된 데이터를 저장
    const updatedData = {
      title: questionTitle,
      type: typeType,
      choices:
        typeType === "객관식 - 단일 선택" || typeType === "객관식 - 다중 선택"
          ? choices
          : undefined,
      count: typeType === "단답형" ? count : undefined,
    };
    onSave(updatedData);
  };

  // (단답형) 최대 글자 수
  const [count, setCount] = useState(initialData?.count); // 255는 임시

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
          <MultipleChoiceQuestion
            choices={choices || ["", ""]}
            addChoice={addChoice}
            deleteChoice={deleteChoice}
            handleChoiceChange={handleChoiceChange}
            isEdit={true}
          />
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
      <CancleSaveButtonFrame
        onCancleClick={onCancel}
        onEditClick={onEditClick}
        isEdit={true}
      />

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
      </div>
    </div>
  );
};
