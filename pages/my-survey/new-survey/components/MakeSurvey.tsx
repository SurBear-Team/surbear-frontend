import { useState } from "react";
import { ShortAnswerType } from "./ShortAnswerQuestion";
import { CancleSaveButtonFrame } from "../../components/CancleSaveButtonFrame";
import { MultipleChoiceQuestion } from "./MultipleChoiceQuestion";
import { TypeDropDown } from "../../components/TypeDropDown";

interface MakeSurveyProps {
  addNewSurveyComponent: (surveyData: {
    title: string;
    type: string;
    choices?: string[];
    count?: number;
  }) => void;
}

export const MakeSurvey = ({ addNewSurveyComponent }: MakeSurveyProps) => {
  const typeList = ["객관식", "단답형", "슬라이더"];

  const [showType, setShowType] = useState(false);
  const [typeType, setTypeType] = useState("객관식");

  // 객, 단, 슬 선택하는 함수
  const handleTypeSelect = (selectedTypeType: string) => {
    setTypeType(selectedTypeType);
    setShowType(false);
  };

  // (공통) 질문 제목
  const [questionTitle, setQuestionTitle] = useState("");

  // (객관식) 답변들 배열, 처음엔 빈 답변 2개
  const [choices, setChoices] = useState(["", ""]);
  // (객관식) 새 답변 추가
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
      alert("답변은 최소 2개");
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
  const [count, setCount] = useState(255); // 255는 임시

  // (공통) 저장 버튼
  const onSaveClick = () => {
    const isTitleEmpty = !questionTitle.trim();
    if (isTitleEmpty) {
      alert("제목을 입력해주세요.");
      return; // 함수 중단
    }

    // (객관식)
    if (typeType === "객관식") {
      const isEmptyAnswer = choices.some((choice) => !choice.trim());
      if (isEmptyAnswer) {
        alert("답변을 모두 입력해주세요.");
        return; // 함수 중단
      }

      const multipleChoiceSurveyData = {
        type: typeType,
        title: questionTitle,
        choices: choices,
      };

      addNewSurveyComponent(multipleChoiceSurveyData);
    }
    // (단답형)
    else if (typeType === "단답형") {
      const shortAnswerSurveyData = {
        type: typeType,
        title: questionTitle,
        count: count,
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

    // 저장 후 입력 필드 초기화
    setQuestionTitle("");
    setChoices(["", ""]);
  };

  return (
    <div className="bg-gray-1 flex flex-col justify-center h-auto p-6 w-full">
      <div className="sm-gray-9-text text-base pb-4">새 질문 만들기</div>
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
          <div className="check-box bg-white border-[1px] border-gray-7" />
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
      {typeType === "객관식" && (
        <>
          {/* 회색선 */}
          <div className="gray-line my-8" />
          <MultipleChoiceQuestion
            choices={choices}
            addChoice={addChoice}
            deleteChoice={deleteChoice}
            handleChoiceChange={handleChoiceChange}
          />
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

      {/* 취소 저장 저장후새질문추가 */}
      <CancleSaveButtonFrame
        onCancleClick={() => {
          console.log("취소");
        }}
        onSaveClick={onSaveClick}
        onSaveAndAddClick={() => {}}
      />
    </div>
  );
};
