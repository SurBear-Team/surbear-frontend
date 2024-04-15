import { useEffect, useState } from "react";
import { TypeDropDown } from "./TypeDropDown";
import { Overlay } from "@/pages/components/styles/Overlay";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { newSurveyState } from "../surveyState";
import { MyCheckBox } from "@/pages/components/MyCheckBox";
import { Dialog } from "@/pages/components/Dialog";

export const NewSurveyCard = ({ onCancel }: { onCancel: () => void }) => {
  const router = useRouter();
  const [recoilSurvey, setRecoilSurvey] = useRecoilState(newSurveyState);

  const [dialog, setDialog] = useState<{ open: boolean; text: string }>({
    open: false,
    text: "",
  });

  const showDialog = (message: string) => {
    setDialog({ open: true, text: message });
  };

  const hideDialog = () => {
    setDialog({ open: false, text: "" });
  };

  // NewSurveyCard 나올 때 이전에 recoil에 저장된 값 초기화
  useEffect(() => {
    setRecoilSurvey({
      surveyTitle: "",
      surveyDescription: "",
      surveyCategory: "기타",
      isPrivate: false,
      maxPerson: "",
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
  const [categoryType, setCategoryType] = useState("기타");
  let categoryList = ["기타", "사회", "경제", "생활", "취미", "IT", "문화"];
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
  const handleEndTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRecoilSurvey({ ...recoilSurvey, endTime: e.target.value });
  };

  // 다음 버튼 클릭
  const nextButtonClick = () => {
    const now = new Date();
    // 종료 시간 파싱
    const endTime = new Date(recoilSurvey.endTime);
    const maxPerson = parseInt(recoilSurvey.maxPerson);

    // 유효성 검사: 설문 주제, 설문 설명, 종료 시간, 최대 인원, 종료 시간
    if (
      !recoilSurvey.surveyTitle ||
      !recoilSurvey.surveyDescription ||
      !recoilSurvey.endTime
    ) {
      showDialog("설문 주제, 설문 설명, 종료 시간을 모두 입력해주세요.");
      return;
    } else if (maxPerson !== null && (isNaN(maxPerson) || maxPerson <= 0)) {
      showDialog("최대 인원을 확인해주세요");
      return;
    } else if (endTime < now) {
      showDialog("종료 시간을 확인해주세요");
      return;
    }
    // 모든 검사를 통과했으면 다음 페이지로 이동
    router.push("my-survey/new-survey");
  };

  return (
    <>
      <Overlay />
      <div className="card fixed bg-white w-auto gap-4 shadow-md z-20">
        {/* 새 설문 주제 */}
        <div className="flex flex-col gap-1 w-full">
          <div className="sm-gray-9-text text-base">새 설문 주제</div>
          <input
            value={recoilSurvey.surveyTitle}
            onChange={handleTitleChange}
            placeholder="설문 주제를 입력해주세요"
            className="main-input text-gray-9"
          />
        </div>

        {/* 설문 설명 */}
        <div className="flex flex-col gap-1 w-full">
          <div className="sm-gray-9-text text-base">설문 설명</div>
          <textarea
            value={recoilSurvey.surveyDescription}
            onChange={handleDescriptionChange}
            className="w-auto p-2 items-start border-[1px] border-gray-4 font-normal text-sm resize-none"
          />
        </div>

        {/* 카테고리 */}
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

        {/* 결과비공개여부 최대인원 */}
        <div className="flex gap-8">
          {/* 결과 비공개 여부 */}
          <div className="flex items-center gap-2">
            <div className="sm-gray-9-text text-base whitespace-nowrap">
              결과 비공개 여부
            </div>
            <MyCheckBox
              isChecked={isChecked}
              onCheckClick={handleCheckboxChange}
            />
          </div>

          {/* 최대 인원 */}
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

        {/* 종료 시간 */}
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

        {/* 회색 선 */}
        <div className="gray-line my-6" />

        {/* 취소 다음 버튼 */}
        <div className="w-full flex gap-4">
          <button
            onClick={onCancel}
            className="long-button bg-white text-gray-5 border-gray-5 w-full"
          >
            취소
          </button>
          <button
            onClick={nextButtonClick}
            className="long-button primary-btn-style w-full"
          >
            다음
          </button>
        </div>
      </div>

      {/* 오류 다이얼로그 */}
      <div className="fixed h-screen flex items-center justify-center z-30">
        {dialog.open && (
          <Dialog
            title={dialog.text}
            onlyOneBtn={true}
            rightText={"닫기"}
            onRightClick={hideDialog}
          />
        )}
      </div>
    </>
  );
};
