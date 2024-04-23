import { useRouter } from "next/router";
import CharSVG from "../components/styles/CharSVG";
import { useRecoilValue } from "recoil";
import { userNicknameAtom } from "./userState";

export default function CompleteSignUp() {
  const router = useRouter();
  const nickname = useRecoilValue(userNicknameAtom);
  return (
    <div className="white-screen flex-col px-12">
      <div className="flex justify-center mb-8">
        <CharSVG />
      </div>
      <div className="text-center font-semibold text-xl text-gray-9">
        {`${nickname} 님`} <br />
        회원가입을 축하합니다!
      </div>
      <div className="gray-line mt-12" />
      <button
        className="long-button w-full mt-8 bg-white border-primary-1 text-primary-1"
        onClick={() => {
          router.push("/sign-in");
        }}
      >
        로그인 페이지로
      </button>
    </div>
  );
}
