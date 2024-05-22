import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import CharSVG from "../../components/styles/CharSVG";
import {
  userEmailAtom,
  userIdAtom,
  userNicknameAtom,
  userPasswordAtom,
} from "./userState";

export default function CompleteSignUp() {
  const router = useRouter();
  const [nickname, setNickname] = useRecoilState(userNicknameAtom);
  const [, setPassword] = useRecoilState(userPasswordAtom);
  const [, setUserEmail] = useRecoilState(userEmailAtom);
  const [, setUserId] = useRecoilState(userIdAtom);
  return (
    <div className="white-screen flex-col px-12">
      <div className="flex justify-center mb-8">
        <CharSVG />
      </div>
      <div className="text-center font-semibold text-xl text-gray-9">
        {`${nickname} 님`} <br />
        회원가입을 축하합니다!
      </div>
      <div className="gray-line mt-12 w-full" />
      <button
        className="long-button w-full mt-8 white-bg-primary-btn"
        onClick={() => {
          router.push("/sign-in");

          setNickname("");
          setPassword("");
          setUserEmail("");
          setUserId("");
        }}
      >
        로그인 페이지로
      </button>
    </div>
  );
}
