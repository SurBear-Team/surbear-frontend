import { useRouter } from "next/router";
import { TopBar } from "../components/TopBar";
import {
  ArrowBackIcon,
  PlusIcon,
  UpdateIcon,
} from "../components/styles/Icons";
import { useState } from "react";
import { TypeDropDown } from "./components/TypeDropDown";
import { MultipleChoiceType } from "./components/AnswerType";
import { CancleSaveButtonFrame } from "./components/CancleSaveButtonFrame";

export default function NewSurvey() {
  const router = useRouter();

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
    <>
      <TopBar
        leftSVG={<ArrowBackIcon />}
        onLeftClick={() => {
          router.back();
        }}
        title={`설문제목 2줄까지 길어지면 ... 설문제목 2...`}
        rightSVG={<UpdateIcon />}
        onRightClick={() => {
          console.log("제목 수정");
        }}
        hasShadow={true}
      />
      <div className="screen">
        <div className="bg-gray-1 flex flex-col justify-center h-auto p-6 w-full">
          <div className="sm-gray-9-text text-base pb-4">새 질문 만들기</div>
          {/* 형식 필수답변 */}
          <div className="flex justify-center items-center gap-4">
            <div className="flex gap-4 w-full items-center">
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

          {/* 회색선 */}
          <div className="gray-line my-8" />

          {/* 답변들 */}
          {choices.map((_, index) => (
            <div key={index}>
              <MultipleChoiceType
                onMoveClick={() => {
                  console.log("답변 이동");
                }}
                onDeleteClick={() => deleteChoice(index)}
                AnswerNumber={index + 1}
              />
            </div>
          ))}

          {/* 새 답변 추가 버튼 */}
          <button
            className="medium-Btn white-bg-primary-btn self-center w-auto mt-6"
            onClick={addChoice}
          >
            <div className="flex items-center gap-1">
              <PlusIcon /> 새 답변 추가
            </div>
          </button>

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
      </div>
    </>
  );
}
