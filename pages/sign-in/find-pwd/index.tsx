import { TopBar } from "@/pages/components/TopBar";
import { ArrowBackIcon } from "@/pages/components/styles/Icons";
import { useRouter } from "next/router";

export default function FindPwd() {
  const router = useRouter();

  return (
    <>
      <TopBar
        onLeftClick={() => router.back()}
        leftSVG={<ArrowBackIcon />}
        title="비밀번호 찾기"
      />
      <div className="screen">
        <div>하잉</div>
      </div>
    </>
  );
}
