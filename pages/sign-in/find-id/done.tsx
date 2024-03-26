import CharSVG from "@/pages/components/styles/CharSVG";
import { useRouter } from "next/router";

export default function FoundId() {
  const router = useRouter();
  return (
    <div className="screen flex-col px-12">
      <div className="flex justify-center mb-8">
        <CharSVG />
      </div>
      <div className="text-center font-semibold text-xl text-gray-9">
        {`${"임직찬"} 님의 아이디는`}
        <br />
        {`${"gachon1234"} 입니다`}
      </div>
      <div className="gray-line mt-12" />
      <button
        className="long-button w-full mt-8 bg-white border-primary-1 text-primary-1"
        onClick={() => {
          router.push("/sign-in/find-pwd");
        }}
      >
        비밀번호 찾기
      </button>
      <button
        className="long-button w-full mt-4 bg-primary-1 border-primary-1 text-white"
        onClick={() => {
          router.push("/sign-in");
        }}
      >
        로그인 페이지로
      </button>
    </div>
  );
}
