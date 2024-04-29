import { TopBar } from "@/pages/components/TopBar";
import { ArrowBackIcon } from "@/pages/components/styles/Icons";
import { useRouter } from "next/router";

export default function SurveyDelete() {
  const router = useRouter();
  return (
    <>
      <TopBar
        title="포인트 지급 내역"
        onLeftClick={() => {
          router.back();
        }}
        leftSVG={<ArrowBackIcon />}
      />
      <div className="screen flex-col justify-start pt-[66px]"></div>
    </>
  );
}
