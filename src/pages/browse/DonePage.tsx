import CharSVG from "@/components/styles/CharSVG";
import { useRouter } from "next/router";

export default function Done() {
  const router = useRouter();

  return (
    <div className="screen flex-col px-12">
      <div className="flex justify-center mb-8">
        <CharSVG />
      </div>
      <div className="text-center font-semibold text-xl text-gray-9">
        설문조사를 제출하였습니다
      </div>
      <div className="gray-line mt-12 w-full" />

      <button
        className="long-button w-full mt-4 primary-btn-style"
        onClick={() => {
          router.push("/browse");
        }}
      >
        메인 페이지로
      </button>
    </div>
  );
}
