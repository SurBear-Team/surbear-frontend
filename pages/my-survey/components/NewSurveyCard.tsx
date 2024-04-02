import { useState } from "react";
import { TypeDropDown } from "./TypeDropDown";
import { Overlay } from "@/pages/components/styles/Overlay";
import { useRouter } from "next/router";

export const NewSurveyCard = ({ onCancel }: { onCancel: () => void }) => {
  const router = useRouter();

  const [showCategory, setShowCategory] = useState(false);
  const [categoryType, setCategoryType] = useState("전체");
  let categoryList = [
    "전체",
    "사회",
    "경제",
    "생활",
    "취미",
    "IT",
    "문화",
    "기타",
  ];
  const handleCategorySelect = (selectedCategoryType: string) => {
    setCategoryType(selectedCategoryType);
    setShowCategory(false);
  };
  return (
    <>
      <Overlay />
      <div className="card fixed bg-white w-auto gap-4 shadow-md z-20">
        <div className="flex flex-col gap-1 w-full">
          <div className="sm-gray-9-text text-base">새 설문 주제</div>
          <input
            placeholder="설문 주제를 입력해주세요"
            className="main-input"
          />
        </div>

        <div className="flex flex-col gap-1 w-full">
          <div className="sm-gray-9-text text-base">설문 설명</div>
          <textarea className="w-auto p-2 items-start border-[1px] border-gray-4 font-normal text-sm"></textarea>
        </div>

        <div className="flex w-full items-center gap-4">
          <div className="sm-gray-9-text text-base whitespace-nowrap">
            카테고리
          </div>
          <TypeDropDown
            onShowTypeClick={() => {
              setShowCategory((prev) => !prev);
            }}
            showType={showCategory}
            typeType={categoryType}
            typeList={categoryList}
            onTypeSelect={handleCategorySelect}
          />
        </div>

        <div className="flex gap-8">
          <div className="flex items-center gap-2">
            <div className="sm-gray-9-text text-base whitespace-nowrap">
              결과 비공개 여부
            </div>
            <div className="check-box bg-white border-[1px] border-gray-7" />
          </div>

          <div className="flex justify-between w-full items-center gap-2">
            <div className="sm-gray-9-text text-base">최대 인원</div>
            <input
              type="number"
              className="w-16 p-2 rounded-lg border-[1px] border-gray-4"
            />
          </div>
        </div>

        <div className="w-full flex flex-col gap-1">
          <div className="sm-gray-9-text text-base whitespace-nowrap">
            종료 시간
          </div>
          <input
            type="datetime-local"
            className="w-full p-2 border border-gray-4 sm-gray-9-text"
          />
        </div>

        <div className="gray-line my-6" />

        <div className="w-full flex gap-4">
          <button
            onClick={onCancel}
            className="medium-Btn bg-white text-gray-5 border-gray-5 w-full"
          >
            취소
          </button>
          <button
            onClick={() => {
              router.push("my-survey/newSurvey");
            }}
            className="medium-Btn primary-btn-style w-full"
          >
            다음
          </button>
        </div>
      </div>
    </>
  );
};
