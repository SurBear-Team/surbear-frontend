import { useEffect, useState } from "react";
import { TabBar } from "../components/TabBar";
import { MySurveyCard } from "./components/MySurveyCard";
import { Dialog } from "../components/Dialog";
import { NewSurveyCard } from "./components/NewSurveyCard";
import { TopBar } from "../components/TopBar/TopBar";
import api from "../api/config";
import { ISurvey } from "../browse/data";
import axios from "axios";
import { useQuery, useQueryClient } from "react-query";

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
  const queryClient = useQueryClient();

  // 기본 다이얼로그
  const [dialog, setDialog] = useState<DialogState>({
    open: false,
    text: "",
    rightText: "",
    isDelete: false,
    surveyId: 0, // 이거
  });

  // 내 설문 목록 가져오기
  const fetchSurveys = async () => {
    const { data } = await api.get("/survey/management/list/3");
    return data;
  };
  const { data: mySurveyData } = useQuery<ISurvey[]>("surveys", fetchSurveys);

  // 이건 콘솔 찍기
  useEffect(() => {
    console.log(mySurveyData);
  }, [mySurveyData]);

  // 설문 삭제 다이얼로그 띄우기
  const handleDeleteSurvey = (id: number) => {
    setDialog({
      open: true,
      text: "설문을 삭제하시겠습니까?",
      rightText: "삭제",
      isDelete: true,
      surveyId: id,
    });
  };

  // 다이얼로그에서 설문 삭제 클릭
  const deleteSurveyClick = async (id: number) => {
    await axios.delete(`${baseUrl}/survey/management/${id}`);
    queryClient.invalidateQueries("surveys");
  };

  // 설문 시작 다이얼로그 띄우기
  const handleStartSurvey = (id: number) => {
    setDialog({
      open: true,
      text: "설문을 시작하시겠습니까?",
      rightText: "시작",
      isDelete: false,
      surveyId: id,
      onConfirm: () => startSurveyClick(id), // '시작' 버튼 클릭 시 실행될 함수
    });
  };

  // 다이얼로그에서 설문 시작 클릭
  const startSurveyClick = (id: number) => {
    const requestBody = {
      id: id,
      type: "PROGRESS",
    };

    axios
      .put(`${baseUrl}/survey/management/ongoing-type`, requestBody)
      .then(() => {
        console.log(`${id} 설문 시작`);
        queryClient.invalidateQueries("surveys");
        setDialog({ ...dialog, open: false }); // 다이얼로그 닫기
      })
      .catch((err) => console.log(err));
  };

  // 새 설문 만들기
  const [showNewSurveyCard, setShowNewSurveyCard] = useState(false);

  const [selectedSurveyId, setSelectedSurveyId] = useState<string | undefined>(
    undefined
  );

  // 설문 수정 카드 띄우기
  const handleEditSurvey = (id: string) => {
    setSelectedSurveyId(id); // 선택한 설문의 ID 설정
    setShowNewSurveyCard(true); // 수정 카드를 보이게 설정
  };
  return (
    <>
      <TopBar
        title="내 설문"
        hasPlus
        onRightClick={() => {
          setSelectedSurveyId(undefined); // surveyId 초기화
          setShowNewSurveyCard((prev) => !prev);
        }}
      />

      <div className="screen pt-[50px]">
        <div className="list-screen">
          <div className="list">
            {mySurveyData?.map(
              (data, index) =>
                !data.deleted && ( // 삭제되지 않은거만 보이게
                  <MySurveyCard
                    key={index}
                    category={data.surveyType}
                    title={data.title}
                    onDeleteClick={() => handleDeleteSurvey(data.id)}
                    beforeStart={data.ongoingType === "PAUSE"} // true면 설문 시작 나옴
                    beforeFinish={data.ongoingType === "PROGRESS"} // true면 설문 종료 나옴
                    showResult={data.ongoingType === "CLOSE"} // true면 결과 보기 나옴
                    onUpdateClick={() => handleEditSurvey(data.id.toString())}
                    onStartClick={() => handleStartSurvey(data.id)}
                    onFinishClick={() => {}}
                    onResultClick={() => {}}
                  />
                )
            )}
          </div>
        </div>
        {showNewSurveyCard && (
          <NewSurveyCard
            onCancel={() => setShowNewSurveyCard(false)}
            surveyId={selectedSurveyId}
          />
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
                  deleteSurveyClick(dialog.surveyId);
                } else if (dialog.onConfirm) {
                  dialog.onConfirm(); // 설문 시작 눌렀을 때
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
