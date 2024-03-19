import { useRouter } from "next/router";
import { TopBar } from "../components/TopBar";

export default function IdPassword() {
  const router = useRouter();

  return (
    <>
      <TopBar onClick={() => router.back()} leftSVG={"⬅"} />
      <div className="screen px-12 flex-col w-full">
        {/* 전화번호 */}
        <div className="w-full">
          <span className="font-extrabold">아이디</span>
          <input
            type="text"
            placeholder="아이디를 입력해주세요"
            className="main-input mt-1 mb-10 text-[#101010]"
          />
        </div>

        {/* 비밀번호 */}
        <div className="w-full">
          <span className="font-extrabold ">비밀번호</span>
          <input
            type="password"
            placeholder="비밀번호를 입력해주세요"
            className="main-input mt-1 mb-10 text-[#101010] "
          />
        </div>

        {/* 비밀번호 확인 */}
        <div className="w-full">
          <span className="font-extrabold mb-1">비밀번호 확인</span>
          <input
            type="password"
            placeholder="비밀번호를 확인해주세요"
            className="main-input mt-1 mb-10 text-[#101010]"
          />
        </div>

        <div className="gray-line w-full mt-12 mx-10" />

        <div className="w-full">
          <button
            className="long-button px-32 mt-8 font-extrabold bg-white border-[#6E7CF2] text-[#6E7CF2]"
            onClick={() => {}}
          >
            다음
          </button>
        </div>
      </div>
    </>
  );
}
