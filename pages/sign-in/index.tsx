import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import Link from "next/link";
import LogoSVG from "../components/styles/LogoSVG";

export default function SignIn() {
  const { register, handleSubmit } = useForm();
  const router = useRouter();

  const onSubmit = async (data: any) => {
    try {
      const response = await axios.post("http://surbear.com", data);

      // 로그인 성공 시 'survey-list'로 이동
      if (response.status === 200) {
        router.push("/survey-list");
      } else {
        alert("아이디 혹은 비밀번호를 확인해주세요.");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("네트워크 에러");
    }
  };

  return (
    <div className="screen">
      <div className="inner-screen">
        {/* 이거 나중에 루트로 뺌 */}
        <div className="px-12 w-full">
          <div className="flex justify-center mb-8">
            <LogoSVG />
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-2 mb-6">
              <input
                className="main-input text-gray-9"
                placeholder="아이디를 입력해주세요"
                id="username"
                {...register("username")}
              />

              <input
                className="main-input text-gray-9"
                placeholder="비밀번호를 입력해주세요"
                id="password"
                type="password"
                {...register("password")}
              />
            </div>
            <button className="long-button primary-btn-style" type="submit">
              로그인
            </button>
          </form>

          {/* 아찾 비찾 회가 */}
          <div className="flex mt-4 justify-center gap-6">
            <Link
              href="/sign-in/find-id"
              className="text-gray-7 text-xs whitespace-nowrap"
            >
              아이디 찾기
            </Link>

            <Link
              href="/sign-in/find-pwd"
              className="text-gray-7 text-xs whitespace-nowrap"
            >
              비밀번호 찾기
            </Link>
            <Link
              href="/sign-up/terms"
              className="text-gray-7 text-xs whitespace-nowrap"
            >
              회원가입
            </Link>
          </div>

          {/* 또는 */}
          <div className="mt-6 flex px-6 items-center">
            <div className="w-full h-[1px] bg-[#EAEAEA]" />
            <div className="text-gray-7 px-3 text-center text-[10px] font-medium whitespace-nowrap">
              또는
            </div>
            <div className="w-full h-[1px] bg-[#EAEAEA]" />
          </div>
          <button
            className="long-button mt-7 bg-white border-primary-1 text-primary-1"
            onClick={() => {
              router.push("/browse");
            }}
          >
            로그인 없이 시작
          </button>
        </div>
      </div>
    </div>
  );
}
