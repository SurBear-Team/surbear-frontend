import { TopBar } from "@/pages/components/TopBar/TopBar";
import { useState } from "react";
import { dummyData } from "../data";
import { useRouter } from "next/router";

export default function Survey() {
  const router = useRouter();
  const { id } = router.query;
  const [data] = dummyData.filter((el) => el.id === +id!);
  const [progress, setProgress] = useState(0);
  return (
    <>
      <TopBar
        title="설문 그만두기"
        hasBack
        progress={progress}
        subTitle={data.title}
      />
      <button
        className="mt-20"
        onClick={() => {
          if (progress < 100) setProgress((prev) => prev + 10);
          else setProgress(0);
        }}
      >
        {progress}
      </button>
    </>
  );
}
