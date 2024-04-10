import { useState } from "react";
import { TabBar } from "../components/TabBar";
import { TopBar } from "../components/TopBar";
import { AddSurveyIcon } from "../components/styles/Icons";
import { MySurveyCard } from "./components/MySurveyCard";
import { Dialog } from "../components/Dialog";
import { Overlay } from "../components/styles/Overlay";
import { NewSurveyCard } from "./components/NewSurveyCard";

export default function MySurvey() {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);

  const [showNewSurveyCard, setShowNewSurveyCard] = useState(false);
  return (
    <>
      <TopBar
        title="내 설문"
        rightSVG={
          <div className="flex items-center text-gray-9 text-xs gap-1 font-semibold cursor-pointer">
            <AddSurveyIcon />
            <div>새 설문 만들기</div>
          </div>
        }
        onRightClick={() => {
          setShowNewSurveyCard((prev) => !prev);
        }}
        hasShadow={true}
      />

      <div className="screen">
        <div className="list-screen pt-[50px]">
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
