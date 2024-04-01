import { useState } from "react";
import { ShortAnswerType } from "./AnswerType";
import { CancleSaveButtonFrame } from "./CancleSaveButtonFrame";
import { MultipleChoiceQuestion } from "./MultipleChoiceQuestion";
import { TypeDropDown } from "./TypeDropDown";

export const MakeSurvey = () => {
  const typeList = ["객관식", "단답형", "슬라이더"];

  const [showType, setShowType] = useState(false);
  const [typeType, setTypeType] = useState("객관식");

  const handleTypeSelect = (selectedTypeType: string) => {
    setTypeType(selectedTypeType);
    setShowType(false);
  };

  const [choices, setChoices] = useState([{}, {}]);

  // 새 답변 추가
  const addChoice = () => {
    setChoices([...choices, {}]);
  };

  const deleteChoice = (index: number) => {
    // 2개 이상일 때만 삭제
    if (choices.length > 2) {
      const newChoices = choices.filter((_, i) => i !== index);
      setChoices(newChoices);
    } else {
      alert("답변은 최소 2개");
    }
  };

  return (
    <div className="bg-gray-1 flex flex-col justify-center h-auto p-6 w-full">
      <div className="sm-gray-9-text text-base pb-4">새 질문 만들기</div>
      {/* 형식 필수답변 */}
      <div className="flex justify-center items-center gap-4">
        <div className="flex gap-4 w-full items-center">
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
          />
        </>
      )}

      {typeType === "단답형" && (
        <>
          <ShortAnswerType />
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
        onSaveClick={() => {
          console.log("저장");
        }}
        onSaveAndAddClick={() => {
          console.log("저장후새질문추가");
        }}
      />
    </div>
  );
};
