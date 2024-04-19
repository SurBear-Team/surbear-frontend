import { useEffect, useState } from "react";
import { TabBar } from "../components/TabBar";
import { MySurveyCard } from "./components/MySurveyCard";
import { Dialog } from "../components/Dialog";
import { NewSurveyCard } from "./components/NewSurveyCard";
import { TopBar } from "../components/TopBar/TopBar";
import api from "../api/config";
import { ISurvey } from "../browse/data";
import axios from "axios";

interface DialogState {
  open: boolean;
  text: string;
  rightText: string;
  isDelete: boolean;
  surveyId: number; // 진짜 id 들어오면 string으로 바꿈
  onConfirm?: () => void;
}

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export default function MySurvey() {
  const [dialog, setDialog] = useState<DialogState>({
    open: false,
    text: "",
    rightText: "",
    isDelete: false,
    surveyId: 0, // 이거
  });

  const [mySurveyList, setMySurveyList] = useState<ISurvey[]>();

  useEffect(() => {
    api
      .get("/survey/management/list/3")
      .then((res) => {
        setMySurveyList(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  // 설문 삭제 버튼
  const deleteSurvey = (id: number) => {
    axios
      .delete(`${baseUrl}/survey/management/${id}`)
      .then(() => {
        console.log(id + "삭제");
        // 현재 목록에서 선택한 id의 항목을 제거
        setMySurveyList((prev) => prev?.filter((survey) => survey.id !== id));
        setDialog({ ...dialog, open: false });
      })
      .catch((err) => console.log(err));
  };

  // 설문 시작 버튼
  const handleStartSurvey = (id: number) => {
    setDialog({
      open: true,
      text: "설문을 시작하시겠습니까?",
      rightText: "시작",
      isDelete: false,
      surveyId: id,
      onConfirm: () => surveyStarClick(id), // '시작' 버튼 클릭 시 실행될 함수
    });
  };

  const surveyStarClick = (id: number) => {
    const requestBody = {
      id: id,
      type: "PROGRESS",
    };

    axios
      .put(`${baseUrl}/survey/management/ongoing-type/${id}`, requestBody)
      .then(() => {
        console.log(`${id} 설문 시작`);
        setMySurveyList((prev) =>
          prev?.map((survey) =>
            survey.id === id ? { ...survey, ongoingType: "PROGRESS" } : survey
          )
        );
        setDialog({ ...dialog, open: false }); // 다이얼로그 닫기
      })
      .catch((err) => console.log(err));
  };

  // 새 설문 만들기
  const [showNewSurveyCard, setShowNewSurveyCard] = useState(false);
  return (
    <>
      <TopBar
        title="내 설문"
        hasPlus
        onRightClick={() => {
          setShowNewSurveyCard((prev) => !prev);
        }}
      />

      <div className="screen pt-[50px]">
        <div className="list-screen">
          <div className="list">
            {mySurveyList?.map(
              (data, index) =>
                !data.deleted && ( // 삭제되지 않은거만 보이게
                  <MySurveyCard
                    key={index}
                    category={data.surveyType}
                    title={data.title}
                    onDeleteClick={() => {
                      setDialog({
                        open: true,
                        text: "설문을 삭제하시겠습니까?",
                        rightText: "삭제",
                        isDelete: true,
                        surveyId: data.id,
                      });
                    }}
                    beforeStart={data.ongoingType === "PAUSE"} // true면 설문 시작 나옴
                    beforeFinish={data.ongoingType === "PROGRESS"} // true면 설문 종료 나옴
                    showResult={data.ongoingType === "CLOSE"} // true면 결과 보기 나옴
                    onUpdateClick={() => {
                      setDialog({
                        open: true,
                        text: "설문을 수정하시겠습니까?",
                        rightText: "수정",
                        isDelete: false,
                        surveyId: data.id,
                      });
                    }}
                    onStartClick={() => handleStartSurvey(data.id)}
                    onFinishClick={() => {}}
                    onResultClick={() => {}}
                  />
                )
            )}
          </div>
        </div>
        {showNewSurveyCard && (
          <NewSurveyCard onCancel={() => setShowNewSurveyCard(false)} />
        )}

        {dialog.open && (
          <>
            <Dialog
              title={dialog.text}
              leftText="취소"
              onLeftClick={() =>
                setDialog((current) => ({ ...current, open: false }))
              }
              rightText={dialog.rightText}
              onRightClick={() => {
                if (dialog.isDelete && dialog.surveyId) {
                  deleteSurvey(dialog.surveyId);
                } else if (dialog.onConfirm) {
                  dialog.onConfirm(); // 다른 조건 없이 onConfirm 호출
                }
                setDialog((current) => ({ ...current, open: false })); // 모든 경우 다이얼로그 닫기
              }}
              isDelete={dialog.isDelete}
            />
          </>
        )}
      </div>

      <TabBar />
    </>
  );
}
