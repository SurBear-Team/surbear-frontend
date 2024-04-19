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

  const deleteSurvey = (id: number) => {
    axios
      .delete(`${baseUrl}/survey/management/${id}`)
      .then(() => {
        console.log(id + "삭제");
        setMySurveyList((prev) => prev?.filter((survey) => survey.id !== id));
        setDialog({ ...dialog, open: false });
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
                    beforeStart={true} // true면 설문 시작 나옴
                    beforeFinish={false} // true면 설문 종료 나옴
                    showResult={false} // true면 결과 보기 나옴
                    onUpdateClick={() => {
                      setDialog({
                        open: true,
                        text: "설문을 수정하시겠습니까?",
                        rightText: "수정",
                        isDelete: false,
                        surveyId: data.id,
                      });
                    }}
                    onBlueBtnClick={() => {
                      console.log("설문 시작");
                    }}
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
              onLeftClick={() => setDialog({ ...dialog, open: false })}
              rightText={dialog.rightText}
              onRightClick={() => {
                if (dialog.isDelete && dialog.surveyId) {
                  deleteSurvey(dialog.surveyId);
                }
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
