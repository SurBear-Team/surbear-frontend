import api from "@/api/config";
import { Dialog } from "@/components/Dialog";
import { MyCheckBox } from "@/components/MyCheckBox";
import { Overlay } from "@/components/styles/Overlay";
import { useOneBtnDialog } from "@/hooks/useOneBtnDialog";
import { editSurveyTitleAtom } from "@/pages/edit-survey/editSurveyState";
import axios from "axios";
import { JwtPayload, jwtDecode } from "jwt-decode";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useQuery, useQueryClient } from "react-query";
import { useRecoilState } from "recoil";
import { surveyIdAtom } from "../surveyState";
import { TypeDropDown } from "./TypeDropDown";

const categoryList = [
  "기타",
  "사회",
  "경제",
  "생활",
  "취미",
  "IT",
  "교육",
  "문화",
];
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

interface SurveyData {
  surveyType: string;
  maximumNumberOfPeople: number;
  title: string;
  description: string;
  openType: boolean;
  deadLine: string;
  surveyAuthorId?: number;
}

interface NewSurveyCardProps {
  onCancel: () => void;
  surveyId?: string;
}

export const NewSurveyCard = ({ onCancel, surveyId }: NewSurveyCardProps) => {
  const isEdit = !!surveyId; // surveyId가 있다면 isEdit은 true
  const router = useRouter();
  const queryClient = useQueryClient();
  // 유저 토큰
  const [token, setToken] = useState(0);
  useEffect(() => {
    const storedToken = localStorage.getItem("surbearToken");
    if (storedToken) {
      const decoded = jwtDecode<JwtPayload>(storedToken);
      if (decoded && decoded.sub) {
        setToken(parseInt(decoded.sub));
      }
    }
  }, []);

  // surveyId저장
  const [, setRecoilSurveyId] = useRecoilState(surveyIdAtom);

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
      setIsChecked(data.openType === true);
      setMaxPeople(data.maximumNumberOfPeople.toString() || "");
      setDeadline(new Date(data.deadLine));
    },
  });

  // 다이얼로그
  const { oneBtnDialog, showOneBtnDialog, hideOneBtnDialog } =
    useOneBtnDialog();
  // 제목
  const [surveyTitle, setSurveyTitle] = useState("");

  // 제목 onChange
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSurveyTitle(e.target.value);
  };
  // 제목 input에서 벗어났을 때 로컬에 제목 저장
  const handleTitleBlur = () => {
    localStorage.setItem("surveyTitle", surveyTitle);
  };

  // 설명
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
    교육: "EDUCATION",
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
    +e.target.value > 200 ? setMaxPeople("200") : setMaxPeople(e.target.value);
  };

  const [deadline, setDeadline] = useState<Date | null>(null);

  // 유효성 검사
  // false를 반환할 수 있음
  const validateFormData = (): SurveyData | false => {
    const now = new Date();
    // 최대 인원 빈값이면 788183 전송
    const maxPersonInput = maxPeople.trim() === "" ? "788183" : maxPeople;
    const parsedMaxPerson = parseInt(maxPersonInput, 10);
    const titleTrimmed = surveyTitle.trim();
    const descriptionTrimmed = description.trim(); // 앞뒤 공백 제거

    if (!deadline) {
      showOneBtnDialog("종료 날짜와 시간을 입력해주세요.");
      return false;
    }

    const isoDeadline = deadline.toISOString(); // 분과 초를 00으로 고정

    if (!titleTrimmed || !descriptionTrimmed) {
      showOneBtnDialog("설문 주제와 설문 설명을 입력해주세요");
      return false;
    } else if (isNaN(parsedMaxPerson) || parsedMaxPerson <= 0) {
      showOneBtnDialog("유효한 최대 인원 수를 입력해주세요");
      return false;
    } else if (new Date(isoDeadline) < now) {
      showOneBtnDialog("종료 시간은 현재 이후로 입력해주세요");
      return false;
    }

    return {
      surveyType: category,
      maximumNumberOfPeople: parsedMaxPerson,
      title: surveyTitle,
      description: description,
      openType: isChecked,
      deadLine: isoDeadline,
    };
  };

  const [, setEditSurveyTitle] = useRecoilState(editSurveyTitleAtom);

  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("surbearToken")}`,
    },
  };

  // 다음 버튼 클릭
  const nextButtonClick = async () => {
    const validData = validateFormData();
    if (!validData) return;

    if (isEdit) {
      axios
        .put(`${baseUrl}/survey/management/${surveyId}`, validData, config)
        .then(() => {
          router.push(`/edit-survey/${surveyId}`);
          setEditSurveyTitle(surveyTitle);
        })
        .catch((error) => {
          console.error("설문 수정 오류 : ", error);
          showOneBtnDialog("설문 수정에 실패했습니다.");
        });
    } else {
      try {
        validData.surveyAuthorId = token;
        const response = await axios.post(
          `${baseUrl}/survey`,
          validData,
          config
        );
        if (response.status === 200) {
          setRecoilSurveyId(response.data);
          queryClient.invalidateQueries("my-surveys");
          queryClient.invalidateQueries("registered");
          router.push("/my-survey/new-survey");
        } else {
          showOneBtnDialog("설문 생성에 실패했습니다.");
        }
      } catch (error) {
        console.error(error);
        showOneBtnDialog("설문 생성에 실패했습니다.");
      }
    }
  };

  return (
    <>
      <Overlay onClick={() => {}} />
      <div className="card fixed bg-white w-4/5 max-w-lg min-w-80 gap-4 shadow-md z-50">
        {/* 새 설문 주제 */}
        <div className="flex flex-col gap-1 w-full">
          <div className="base-gray-9-text">
            {isEdit ? "설문 수정하기" : "새 설문 주제"}
          </div>
          <input
            value={surveyTitle}
            onChange={handleTitleChange}
            onBlur={handleTitleBlur}
            placeholder="설문 주제를 입력해주세요"
            className="main-input text-gray-9"
            maxLength={50}
          />
        </div>

        {/* 설문 설명 */}
        <div className="flex flex-col gap-1 w-full">
          <div className="base-gray-9-text">설문 설명</div>
          <textarea
            value={description}
            onChange={handleDescriptionChange}
            className="w-auto p-2 items-start border-[1px] border-gray-4 font-normal text-sm resize-none"
            maxLength={300}
          />
        </div>

        {/* 카테고리 */}
        <div className="flex w-full items-center gap-4">
          <div className="base-gray-9-text whitespace-nowrap">카테고리</div>
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
        <div className="flex w-full justify-between">
          {/* 결과 비공개 여부 */}
          <div className="flex items-center gap-2">
            <div className="base-gray-9-text whitespace-nowrap">
              결과 비공개 여부
            </div>
            <MyCheckBox
              isChecked={isChecked}
              onCheckClick={handleCheckboxChange}
            />
          </div>

          {/* 최대 인원 */}
          <div className="flex justify-between items-center gap-2">
            <div className="base-gray-9-text">최대 인원</div>
            <input
              value={maxPeople === "788183" ? "" : maxPeople}
              onChange={handleMaxPersonChange}
              onBlur={() => {
                if (+maxPeople < 1) setMaxPeople("1");
                if (maxPeople === "") setMaxPeople("");
              }}
              type="number"
              className="w-16 p-2 rounded-lg border-[1px] border-gray-4"
            />
          </div>
        </div>

        {/* 종료 날짜 및 시간 */}
        <div className="w-full flex flex-col gap-1">
          <div className="base-gray-9-text whitespace-nowrap">
            종료 날짜 및 시간
          </div>
          <DatePicker
            selected={deadline} // 사용자가 선택한 날짜 상태
            onChange={(date: Date) => setDeadline(date)}
            showTimeSelect // 시간 선택 기능 활성화
            timeFormat="HH"
            timeIntervals={60} // 시간을 1시간 단위로 설정
            dateFormat="yyyy년 MM월 dd일 HH시"
            timeCaption="시간" // 시간 선택 부분에 써있는거
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
      <div className="fixed h-screen flex-center z-50">
        {oneBtnDialog.open && (
          <Dialog
            title={oneBtnDialog.title}
            rightText="확인"
            onlyOneBtn
            onRightClick={hideOneBtnDialog}
          />
        )}
      </div>
    </>
  );
};
