import { TopBar } from "@/pages/components/TopBar/TopBar";
import { useState } from "react";
import { useRouter } from "next/router";
import SingleChoice from "../components/SingleChoice";
import MultipleChoice from "../components/MultipleChoice";

const dummyData = [
  {
    id: 1,
    question: "단일 선택 객관식",
    selection: ["a", "b", "c"],
    type: "SINGLE_CHOICE",
  },
  {
    id: 2,
    question: "복수 선택 객관식",
    selection: ["a", "b", "c"],
    type: "MULTIPLE_CHOICE",
  },
  {
    id: 3,
    question: "질문1",
    selection: ["a", "b", "c"],
    type: "TEXT",
  },
];

export default function Survey() {
  const router = useRouter();
  const { id } = router.query;
  const [progress, setProgress] = useState(0);
  return (
    <>
      <TopBar
        title="설문 그만두기"
        hasBack
        progress={progress}
        subTitle={"설문 제목"}
      />
      {/* 
      <button
        className="mt-20"
        onClick={() => {
          if (progress < 100) setProgress((prev) => prev + 10);
          else setProgress(0);
        }}
      >
        {progress}
      </button> */}
      <div className="white-screen">
        <div className="w-full flex flex-col">
          {dummyData.map((el, index) => {
            if (el.type === "SINGLE_CHOICE")
              return (
                <SingleChoice
                  key={el.id}
                  index={index + 1}
                  title={el.question}
                  selection={el.selection}
                />
              );
            if (el.type === "MULTIPLE_CHOICE")
              return (
                <MultipleChoice
                  key={el.id}
                  index={index + 1}
                  title={el.question}
                  selection={el.selection}
                />
              );
          })}
        </div>
      </div>
    </>
  );
}
