import { useEffect, useState } from "react";
import { TypeDropDown } from "./TypeDropDown";
import { Overlay } from "@/pages/components/styles/Overlay";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { newSurveyState } from "../surveyState";
import { MyCheckBox } from "@/pages/components/MyCheckBox";

export const NewSurveyCard = ({ onCancel }: { onCancel: () => void }) => {
  const router = useRouter();
  const [recoilSurvey, setRecoilSurvey] = useRecoilState(newSurveyState);

  // NewSurveyCard 나올 때 이전에 recoil에 저장된 값 초기화
  useEffect(() => {
    setRecoilSurvey({
      surveyTitle: "",
      surveyDescription: "",
      surveyCategory: "전체",
      isPrivate: false,
      maxPerson: "255",
      endTime: "",
    });
  }, []);

  // 제목 onChange
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRecoilSurvey({ ...recoilSurvey, surveyTitle: e.target.value });
  };

  // 설명 onChange
  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setRecoilSurvey({ ...recoilSurvey, surveyDescription: e.target.value });
  };

  // 카테고리
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
  // 카테고리 onChange
  const handleCategorySelect = (selectedCategoryType: string) => {
    setCategoryType(selectedCategoryType);
    setShowCategory(false);
    setRecoilSurvey({ ...recoilSurvey, surveyCategory: selectedCategoryType });
  };

  // 결과 비공개 여부 체크박스
  const [isChecked, setIsChecked] = useState(false);
  // 체크박스 onChange
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    setRecoilSurvey((prevState) => ({
      ...prevState,
      isPrivate: !prevState.isPrivate,
    }));
  };

  // 최대 인원 onChange
  const handleMaxPersonChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRecoilSurvey({ ...recoilSurvey, maxPerson: e.target.value });
  };

  // 종료 시간 onChange
  const handleEndTimeChange = (e: any) => {
    setRecoilSurvey({ ...recoilSurvey, endTime: e.target.value });
  };
  return (
    <>
      <Overlay />
      <div className="card fixed bg-white w-auto gap-4 shadow-md z-20">
        <div className="flex flex-col gap-1 w-full">
          <div className="sm-gray-9-text text-base">새 설문 주제</div>
          <input
            value={recoilSurvey.surveyTitle}
            onChange={handleTitleChange}
            placeholder="설문 주제를 입력해주세요"
            className="main-input text-gray-9"
          />
        </div>

        <div className="flex flex-col gap-1 w-full">
          <div className="sm-gray-9-text text-base">설문 설명</div>
          <textarea
            value={recoilSurvey.surveyDescription}
            onChange={handleDescriptionChange}
            className="w-auto p-2 items-start border-[1px] border-gray-4 font-normal text-sm"
          ></textarea>
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
            <MyCheckBox
              isChecked={isChecked}
              onCheckClick={handleCheckboxChange}
            />
          </div>

          <div className="flex justify-between w-full items-center gap-2">
            <div className="sm-gray-9-text text-base">최대 인원</div>
            <input
              value={recoilSurvey.maxPerson}
              onChange={handleMaxPersonChange}
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
            value={recoilSurvey.endTime}
            onChange={handleEndTimeChange}
            type="datetime-local"
            className="w-full p-2 border border-gray-4 sm-gray-9-text"
          />
        </div>

        <div className="gray-line my-6" />

        <div className="w-full flex gap-4">
          <button
            onClick={onCancel}
            className="long-button bg-white text-gray-5 border-gray-5 w-full"
          >
            취소
          </button>
          <button
            onClick={() => {
              router.push("my-survey/new-survey");
            }}
            className="long-button primary-btn-style w-full"
          >
            다음
          </button>
        </div>
      </div>
    </>
  );
};
