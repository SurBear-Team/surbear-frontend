import { useState } from "react";
import { TypeDropDown } from "./TypeDropDown";
import { Overlay } from "@/pages/components/styles/Overlay";
import { useRouter } from "next/router";
import { MyCheckBox } from "@/pages/components/MyCheckBox";
import { Dialog } from "@/pages/components/Dialog";
import api from "@/pages/api/config";
import { getTime } from "@/pages/utils";
import { useQuery } from "react-query";
import axios from "axios";

const categoryList = ["기타", "사회", "경제", "생활", "취미", "IT", "문화"];
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const formatDeadline = (deadline: string | number | Date) => {
  const date = new Date(deadline);
  const year = date.getFullYear();
  const month = `0${date.getMonth() + 1}`.slice(-2);
  const day = `0${date.getDate()}`.slice(-2);
  const hour = `0${date.getHours()}`.slice(-2);
  const minute = `0${date.getMinutes()}`.slice(-2);

  return `${year}-${month}-${day}T${hour}:${minute}`;
};

interface SurveyData {
  surveyType: string;
  maximumNumberOfPeople: number;
  title: string;
  description: string;
  openType: boolean;
  deadLine: string;
  surveyAuthorId?: number; // 임시로 number
}

interface NewSurveyCardProps {
  onCancel: () => void;
  surveyId?: string;
}

export const NewSurveyCard = ({ onCancel, surveyId }: NewSurveyCardProps) => {
  const isEdit = !!surveyId; // surveyId가 있다면 isEdit은 true
  const router = useRouter();

  // surveyId로 원래 정보 가져오기
  const fetchSurvey = async () => {
    const { data } = await api.get(`/survey/management/${surveyId}`);
    return data;
  };
  // surveyId가 바뀔 때마다 새로운 데이터
  useQuery(["mySurvey", surveyId], fetchSurvey, {
    enabled: !!surveyId,
    // onSuccess는 데이터 요청 완료 되었을 때 실행되는 콜백함수
    onSuccess: (data) => {
      setSurveyTitle(data.title || "");
      setDescription(data.description || "");
      setCategoryType(categoryMapping[data.surveyType] || "기타");
      setCategory(categoryMapping[data.surveyType] || "ETC");
      setIsChecked(data.openType === "PRIVATE");
      setMaxPeople(data.maximumNumberOfPeople.toString() || "");
      setDeadline(formatDeadline(data.deadLine));
    },
  });

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

  // 제목
  const [surveyTitle, setSurveyTitle] = useState("");

  // 제목 onChange
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSurveyTitle(e.target.value);
  };
  const handleTitleBlur = () => {
    localStorage.setItem("surveyTitle", surveyTitle);
  };

  const [description, setDescription] = useState("");
  // 설명 onChange
  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(e.target.value);
  };

  // 카테고리
  const [showCategory, setShowCategory] = useState(false);
  const [categoryType, setCategoryType] = useState("기타");

  const categoryMapping: { [key: string]: string } = {
    기타: "ETC",
    사회: "SOCIAL",
    경제: "ECONOMY",
    생활: "LIFE",
    취미: "HOBBY",
    IT: "IT",
    문화: "CULTURE",
  };

  const [category, setCategory] = useState("ETC");

  // 카테고리 onChange
  const handleCategorySelect = (selectedCategoryType: string) => {
    const englishCategory = categoryMapping[selectedCategoryType] || "ETC";
    setCategoryType(selectedCategoryType);
    setShowCategory(false);
    setCategory(englishCategory);
  };

  // 결과 비공개 여부 체크박스
  const [isChecked, setIsChecked] = useState(false);
  // 체크박스 onChange
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const [maxPeople, setMaxPeople] = useState("");

  // 최대 인원 onChange
  const handleMaxPersonChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaxPeople(e.target.value);
  };

  const [deadline, setDeadline] = useState("");
  // 종료 시간 onChange
  const handleEndTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDeadline(e.target.value);
  };

  // 다음 버튼 클릭
  const nextButtonClick = () => {
    const now = new Date();

    const maxPersonInput = maxPeople.trim() === "" ? "10000" : maxPeople;
    const parsedMaxPerson = parseInt(maxPersonInput, 10);

    // 공백을 제거한 후의 값들을 검사
    const titleTrimmed = surveyTitle.trim();
    const descriptionTrimmed = description.trim();

    const { year, month, date, hour, minute } = getTime(deadline);
    // 종료 시간 파싱
    const isoDeadline = new Date(
      year,
      month - 1,
      date,
      hour,
      minute
    ).toISOString();

    // 유효성 검사: 설문 주제, 설문 설명, 종료 시간, 최대 인원, 종료 시간
    if (!titleTrimmed || !descriptionTrimmed || !deadline) {
      showDialog("설문 주제, 설문 설명, 종료 시간을 모두 입력해주세요.");
      return;
    } else if (isNaN(parsedMaxPerson) || parsedMaxPerson <= 0) {
      showDialog("최대 인원을 확인해주세요");
      return;
    } else if (new Date(isoDeadline) < now) {
      showDialog("종료 시간을 확인해주세요");
      return;
    } else if (dialog.open) {
      showDialog("진행 중인 다이얼로그를 확인해주세요.");
      return;
    }

    const surveyData: SurveyData = {
      surveyType: category,
      maximumNumberOfPeople: parsedMaxPerson,
      title: surveyTitle,
      description: description,
      openType: !isChecked,
      deadLine: isoDeadline,
    };

    if (isEdit) {
      axios
        .put(`${baseUrl}/survey/management/${surveyId}`, surveyData)
        .then(() => {
          router.push("/browse");
        })
        .catch((error) => {
          console.error("설문 수정 오류 : ", error);
          showDialog("설문 수정에 실패했습니다.");
        });
    } else {
      surveyData.surveyAuthorId = 3;
      api
        .post("/survey", surveyData)
        .then(() => {
          router.push("/my-survey/new-survey");
        })
        .catch((error) => {
          console.error("설문 생성 오류 : ", error);
          showDialog("설문 생성에 실패했습니다.");
        });
    }
  };

  return (
    <>
      <Overlay onClick={() => {}} />
      <div className="card fixed bg-white w-auto gap-4 shadow-md z-50">
        {/* 새 설문 주제 */}
        <div className="flex flex-col gap-1 w-full">
          <div className="sm-gray-9-text text-base">
            {isEdit ? "설문 수정하기" : "새 설문 주제"}
          </div>
          <input
            value={surveyTitle}
            onChange={handleTitleChange}
            onBlur={handleTitleBlur}
            placeholder="설문 주제를 입력해주세요"
            className="main-input text-gray-9"
          />
        </div>

        {/* 설문 설명 */}
        <div className="flex flex-col gap-1 w-full">
          <div className="sm-gray-9-text text-base">설문 설명</div>
          <textarea
            value={description}
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
              value={maxPeople}
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
            value={deadline}
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
      <div className="fixed h-screen flex items-center justify-center z-50">
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
