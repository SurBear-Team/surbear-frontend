import { useRouter } from "next/router";
import LogoSVG from "./components/styles/LogoSVG";
import { useEffect } from "react";
import CharSVG from "./components/styles/CharSVG";

export default function Home() {
  const router = useRouter();
  // 로그인 여부 확인
  useEffect(() => {
    if (typeof window !== undefined) {
      if (localStorage.getItem("surbearToken") !== null) {
        router.push("/browse");
      } else {
        router.push("/sign-in");
      }
    }
  }, []);
  return (
    <div className="h-screen flex-col flex-center">
      <CharSVG />
      <LogoSVG />
    </div>
  );
}
