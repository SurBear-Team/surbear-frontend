import { Dialog } from "@/pages/components/Dialog";
import { useRouter } from "next/router";
import { useState } from "react";
import { MakeSurvey } from "./components/MakeSurvey";
import { InputTopBar } from "@/pages/my-survey/new-survey/components/InputTopBar";

export default function NewSurvey() {
  const router = useRouter();

  const [title, setTitle] = useState("");

  const [showCloseDialog, setShowCloseDialog] = useState(false);

  const [surveyComponents, setSurveyComponents] = useState([{}]);
  const addNewSurveyComponent = () => {
    setSurveyComponents((prevSurveys) => [...prevSurveys, {}]);
  };

  let MultipleList = ["ex1", "ex2", "ex3"];
  return (
    <>
      <InputTopBar
        title={title}
        setTitle={setTitle}
        onBackClick={() => {
          setShowCloseDialog((prev) => !prev);
        }}
      />
      <div className="screen flex-col pt-14 justify-start">
        <div className="px-6">
          {/* 질문제목 */}
          <div className="flex pb-6">
            <div className="sm-gray-9-text text-base pr-2">{`1.`}</div>
            <div className="sm-gray-9-text text-base">{`질문제목 4줄까지 질문제목 4줄까지 질문제목 4줄까지 질문제목 4줄까지 질문제목 4줄까지 질문제목 4줄까지 질문제목 4줄까지 질문제목 4줄까지 질문제목 4줄까지 질문제목 4줄까지 질문제목 4줄까지 질문제목 4줄까지 질문제목 4줄까지 질문제목 4줄까지 `}</div>
          </div>

          {/* 질문답변 */}
          {MultipleList.map((index) => (
            <div
              key={index}
              className="flex w-full p-2 mb-4 items-center gap-3 border-[1px] border-gray-4 rounded-lg"
            >
              <div className="check-box bg-white border-[1px] border-gray-7 min-w-4" />
              <div className="sm-gray-9-text font-normal">{`선택지 2줄까지 선택지 2줄까지 선택지 2줄까지 선택지 2줄까지 선택지 2줄까지 선택지 2줄까지 선택지 2줄까지 선택지 2줄까지 `}</div>
            </div>
          ))}

          {/* 수정 삭제 버튼 */}
          <div className="flex gap-2 justify-end">
            <button className="small-Btn white-bg-primary-btn">수정</button>
            <button className="small-Btn border-red-1 bg-red-1 text-white">
              삭제
            </button>
          </div>

          <div className="gray-line mt-4 mb-10" />
        </div>

        {surveyComponents.map((_, index) => (
          <MakeSurvey
            key={index}
            addNewSurveyComponent={addNewSurveyComponent}
          />
        ))}

        {showCloseDialog && (
          <>
            <Dialog
              title="설문 제작을 그만 두시겠습니까?"
              leftText="취소"
              onLeftClick={() => {
                setShowCloseDialog((prev) => !prev);
              }}
              rightText="저장하지 않고 종료"
              onRightClick={() => {
                router.back();
              }}
              isDelete={true}
            />
          </>
        )}
      </div>
    </>
  );
}
