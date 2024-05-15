import CharSVG from "@/pages/components/styles/CharSVG";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { findIdAtom } from "../findStatus";
import api from "@/pages/api/config";

export default function FoundId() {
  const router = useRouter();

  const [userEmail, setUserEmail] = useRecoilState(findIdAtom);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    api.get(`/member/userId?email=${userEmail}`).then((data) => {
      setUserId(data.data);
    });
  }, []);

  return (
    <div className="screen flex-col px-12">
      <div className="flex justify-center mb-8">
        <CharSVG />
      </div>
      <div className="text-center font-semibold text-xl text-gray-9">
        {`회원님의 아이디는`}
        <br />
        {`${userId} 입니다`}
      </div>
      <div className="gray-line mt-12 w-full" />
      <button
        className="long-button w-full mt-8 bg-white border-primary-1 text-primary-1"
        onClick={() => {
          router.push("/sign-in/find-pwd");
          setUserEmail("");
        }}
      >
        비밀번호 찾기
      </button>
      <button
        className="long-button w-full mt-4 primary-btn-style"
        onClick={() => {
          router.push("/sign-in");
          setUserEmail("");
        }}
      >
        로그인 페이지로
      </button>
    </div>
  );
}
