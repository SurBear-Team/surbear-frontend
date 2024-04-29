// 설문조사 강제 삭제 내역

import { TopBar } from "@/pages/components/TopBar";
import { ArrowBackIcon } from "@/pages/components/styles/Icons";
import { useRouter } from "next/router";
import { ManageListCard } from "../components/ManageListCard";

export default function SurveyDelete() {
  const router = useRouter();
  return (
    <>
      <TopBar
        title="설문조사 강제 삭제 내역"
        onLeftClick={() => {
          router.back();
        }}
        leftSVG={<ArrowBackIcon />}
      />
      <div className="screen flex-col justify-start pt-[66px]">
        <ManageListCard
          date={"2024.03.15"}
          title={`설문조사 제목 설문조사 제목`}
          nickname={`작성자작성자작성자`}
        />
      </div>
    </>
  );
}
