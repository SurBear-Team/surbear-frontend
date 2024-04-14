import { useState } from "react";
import { TabBar } from "../components/TabBar";
import { MySurveyCard } from "./components/MySurveyCard";
import { Dialog } from "../components/Dialog";
import { NewSurveyCard } from "./components/NewSurveyCard";
import { TopBar } from "../components/TopBar/TopBar";

export default function MySurvey() {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);

  const [showNewSurveyCard, setShowNewSurveyCard] = useState(false);
  return (
    <>
      <TopBar
        title="내 설문"
        newSurvey={() => {
          setShowNewSurveyCard((prev) => !prev);
        }}
      />

      <div className="screen pt-[50px]">
        <div className="list-screen">
          <div className="list">
            <MySurveyCard
              category={`카테고리`}
              title={`제목 2줄까지`}
              onDeleteClick={() => {
                setShowDeleteDialog(true);
              }}
              beforeStart={true}
              onUpdateClick={() => {
                setShowUpdateDialog(true);
              }}
              onBlueBtnClick={() => {
                console.log("설문 시작");
              }}
            />

            <MySurveyCard
              category={`카테고리`}
              title={`제목 2줄까지`}
              onDeleteClick={() => {
                setShowDeleteDialog(true);
              }}
              beforeFinish={true}
              onUpdateClick={() => {
                setShowUpdateDialog(true);
              }}
              onBlueBtnClick={() => {
                console.log("설문 종료");
              }}
            />

            <MySurveyCard
              category={`카테고리`}
              title={`제목 2줄까지`}
              onDeleteClick={() => {
                setShowDeleteDialog(true);
              }}
              showResult={true}
              onBlueBtnClick={() => {
                console.log("결과 보기");
              }}
            />
          </div>
        </div>
        {showNewSurveyCard && (
          <NewSurveyCard onCancel={() => setShowNewSurveyCard(false)} />
        )}

        {showDeleteDialog && (
          <>
            <Dialog
              title="설문을 삭제하시겠습니까?"
              leftText="취소"
              onLeftClick={() => {
                setShowDeleteDialog((prev) => !prev);
              }}
              rightText="삭제"
              onRightClick={() => {
                console.log("`번호` 삭제");
              }}
              isDelete={true}
            />
          </>
        )}

        {showUpdateDialog && (
          <>
            <Dialog
              title="설문을 수정하시겠습니까?"
              leftText="취소"
              onLeftClick={() => {
                setShowUpdateDialog((prev) => !prev);
              }}
              rightText="수정"
              onRightClick={() => {
                console.log("`번호` 수정");
              }}
            />
          </>
        )}
      </div>

      <TabBar />
    </>
  );
}
