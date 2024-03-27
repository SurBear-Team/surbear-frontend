import { TabBar } from "../components/TabBar";
import { TopBar } from "../components/TopBar";
import { AddSurveyIcon } from "../components/styles/Icons";
import { MySurveyCard } from "./components/MySurveyCard";

export default function MySurvey() {
  return (
    <>
      <TopBar
        title="내 설문"
        rightSVG={
          <div className="flex items-center text-gray-9 text-xs gap-1 font-semibold">
            <AddSurveyIcon />
            <div>새 설문 만들기</div>
          </div>
        }
        onRightClick={() => {
          console.log("새 설문 만들기");
        }}
        hasShadow={true}
      />

      <div className="screen">
        <div className="inner-screen pt-[88px]">
          <MySurveyCard
            category={`카테고리`}
            title={`제목 2줄까지`}
            onDeleteClick={() => {
              console.log("설문 삭제");
            }}
            beforeStart={true}
            onUpdateClick={() => {
              console.log("설문 수정");
            }}
            onBlueBtnClick={() => {
              console.log("설문 시작");
            }}
          />

          <MySurveyCard
            category={`카테고리`}
            title={`제목 2줄까지`}
            onDeleteClick={() => {
              console.log("설문 삭제");
            }}
            beforeFinish={true}
            onUpdateClick={() => {
              console.log("설문 수정");
            }}
            onBlueBtnClick={() => {
              console.log("설문 종료");
            }}
          />

          <MySurveyCard
            category={`카테고리`}
            title={`제목 2줄까지`}
            onDeleteClick={() => {
              console.log("설문 삭제");
            }}
            showResult={true}
            onBlueBtnClick={() => {
              console.log("결과 보기");
            }}
          />
        </div>
      </div>

      <TabBar />
    </>
  );
}
