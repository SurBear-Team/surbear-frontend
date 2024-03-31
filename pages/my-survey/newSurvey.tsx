import { useRouter } from "next/router";
import { TopBar } from "../components/TopBar";
import { ArrowBackIcon, UpdateIcon } from "../components/styles/Icons";
import { useState } from "react";
import { TypeDropDown } from "./components/TypeDropDown";

export default function NewSurvey() {
  const router = useRouter();

  const typeList = ["객관식", "단답형", "슬라이더"];

  const [showType, setShowType] = useState(false);
  const [typeType, setTypeType] = useState("객관식");
  const handleTypeSelect = (selectedTypeType: string) => {
    setTypeType(selectedTypeType);
    setShowType(false);
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
        <div className="bg-gray-1 flex flex-col h-auto p-6 w-full">
          <div className="sm-gray-9-text text-base pb-4">새 질문 만들기</div>
          {/* 형식 필수답변 */}
          <div className="flex justify-center items-center gap-4">
            <div className="flex gap-4 w-full items-center">
              <div className="sm-gray-9-text text-base whitespace-nowrap">
                형식
              </div>
              <TypeDropDown
                onShowTypeClick={() => {
                  setShowType(true);
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
        </div>
      </div>
    </>
  );
}
