import { useRouter } from "next/router";
import { TopBar } from "../components/TopBar";
import { ArrowBackIcon, UpdateIcon } from "../components/styles/Icons";

import { MakeSurvey } from "./components/MakeSurvey";

export default function NewSurvey() {
  const router = useRouter();

  return (
    <>
      <TopBar
        leftSVG={<ArrowBackIcon />}
        onLeftClick={() => {
          router.back();
        }}
        title={`설문제목 2줄까지 길어지면 ... 설문제목 2...`}
        rightSVG={<UpdateIcon />}
        onRightClick={() => {
          console.log("제목 수정");
        }}
        hasShadow={true}
      />
      <div className="screen">
        <MakeSurvey />
      </div>
    </>
  );
}
