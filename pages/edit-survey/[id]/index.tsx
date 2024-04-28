import api from "@/pages/api/config";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { useRecoilValue } from "recoil";
import { editSurveyTitleAtom } from "../editSurveyState";
import { useEffect, useState } from "react";
import { TopBar } from "@/pages/components/TopBar/TopBar";
import { NewSurveyProps } from "@/pages/my-survey/new-survey";
import { EditSurvey } from "@/pages/my-survey/new-survey/components/EditSurvey";
import { CreatedQuestion } from "@/pages/my-survey/new-survey/components/CreatedQuestion";
import { Dialog } from "@/pages/components/Dialog";
import { SurveyTabBar } from "@/pages/my-survey/new-survey/components/SurveyTabBar";

export interface SurveyQuestion {
  id: number;
  content: string;
  page: number;
  questionType: string;
  maxText?: number;
}

export interface SurveyData {
  surveyQuestion: SurveyQuestion;
  options: Array<{ answer: string }>;
}

export default function EditSurveyPage() {
  const router = useRouter();
  const { id: surveyId } = router.query; // 현재 id 가져오기
  const surveyTitle = useRecoilValue(editSurveyTitleAtom); // recoil로 가져온 제목

  const [isNewSurvey, setIsNewSurvey] = useState(false); // 새 설문 만들기 창

  const [alertDialog, setAlertDialog] = useState(false); // 다이얼로그
  const [alertText, setAlertText] = useState("");
  const [showCloseDialog, setShowCloseDialog] = useState(false); // 뒤로가기 누르면
  const [saveDialog, setSaveDialog] = useState(false); // 저장하기 누르면

  // 영어 - 한글 매핑하기
  const typeMapping: { [key: string]: string } = {
    SINGLE_CHOICE: "객관식 - 단일 선택",
    MULTIPLE_CHOICE: "객관식 - 다중 선택",
    SHORT_ANSWER: "단답형",
    SLIDER: "슬라이더",
    SUBJECTIVE: "주관식",
  };

  // 기존 설문 데이터 가져오기
  const fetchSurvey = async () => {
    const { data } = await api.get(`/survey/management/option/${surveyId}`);
    return data;
  };
  const { data } = useQuery<SurveyData[]>(
    ["editSurvey", surveyId],
    fetchSurvey,
    {
      enabled: !!surveyId,
    }
  );

  // 콘솔 찍기
  useEffect(() => {
    console.log(data);
  }, []);

  // 현재 페이지
  const [currentPage, setCurrentPage] = useState(1);
  // 현재 페이지의 질문 목록
  const [currentPageData, setCurrentPageData] = useState<SurveyData[]>([]);

  // 현재 페이지의 설문만 보이게
  useEffect(() => {
    if (data) {
      const filteredData = data.filter(
        (item) => item.surveyQuestion.page === currentPage
      );
      setCurrentPageData(filteredData);
    }
  }, [data, currentPage]);

  // 다음 페이지 이동
  const goToNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  // 이전 페이지 이동
  const goToPrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  // (공통) 설문 수정하기
  const [editIndex, setEditIndex] = useState<number | null>(null);
  // (공통) 수정 전 초기 데이타
  const [editData, setEditData] = useState<NewSurveyProps | null>(null);

  // CreatedQuestion에서 수정하기 버튼 누르면 받아오는거
  const handleEdit = (item: SurveyData, index: number | null) => {
    const initialData = {
      title: item.surveyQuestion.content,
      type: typeMapping[item.surveyQuestion.questionType],
      choices: item.options.map((option) => option.answer),
      count: item.surveyQuestion.maxText,
    };
    setEditIndex(index);
    setEditData(initialData);
  };

  // 설문조사 저장 버튼
  const saveSurvey = () => {
    setSaveDialog((prev) => !prev);
  };
  const onSaveClick = () => {
    localStorage.removeItem("surveyTitle");
    router.push("/my-survey");
  };

  return (
    <>
      <TopBar
        title={surveyTitle!}
        hasBack
        onLeftClick={() => {
          setShowCloseDialog((prev) => !prev);
        }}
      />
      <div className="white-screen flex-col pt-14 justify-start">
        <div className="inner-screen pb-20">
          <div className="sm-gray-9-text text-base py-6 pl-6 self-start">
            {`${currentPage} 페이지`}
          </div>
          {currentPageData.map((item, index) =>
            editIndex === index ? (
              <EditSurvey
                key={index}
                initialData={editData!}
                onSave={() => {}}
                onCancel={() => setEditIndex(null)}
              />
            ) : (
              <CreatedQuestion
                key={index}
                answerIndex={index + 1}
                type={typeMapping[item.surveyQuestion.questionType]}
                title={item.surveyQuestion.content}
                answerList={item.options.map((option) => option.answer)}
                count={item.surveyQuestion.maxText}
                onEdit={() => handleEdit(item, index)}
                onDelete={() => {}}
                onOrderChange={() => {}}
              />
            )
          )}

          {alertDialog && (
            <Dialog
              title={alertText}
              leftText="취소"
              rightText="삭제"
              onlyOneBtn={false}
              onLeftClick={() => {
                setAlertDialog((prev) => !prev);
              }}
              onRightClick={() => {}}
              isDelete={true}
            />
          )}

          {showCloseDialog && (
            <>
              <Dialog
                title={
                  <>
                    {"설문 수정을 그만 두시겠습니까?"}
                    <br />
                    {"진행과정은 저장돼요"}
                  </>
                }
                leftText="취소"
                onLeftClick={() => {
                  setShowCloseDialog((prev) => !prev);
                }}
                rightText="예"
                onRightClick={() => {
                  router.back();
                }}
                isDelete={true}
              />
            </>
          )}

          {saveDialog && (
            <Dialog
              title={"설문이 저장되었어요"}
              rightText={"이동"}
              onlyOneBtn
              onRightClick={onSaveClick}
            />
          )}

          {editIndex === null && !isNewSurvey && (
            <SurveyTabBar
              setIsNewSurvey={setIsNewSurvey}
              addNewPage={() => {}}
              goToPrevPage={goToPrevPage}
              goToNextPage={goToNextPage}
              saveSurvey={saveSurvey}
              canAddPage={false}
              setSelectedQuestion={() => {}}
            />
          )}
        </div>
      </div>
    </>
  );
}
