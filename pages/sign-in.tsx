import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import Link from "next/link";

export default function LoginForm() {
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
      {/* 이거 나중에 루트로 뺌 */}
      <div className="px-12 w-full">
        <div className="flex justify-center mb-8">
          <img src="/images/SurBear.png" alt="SurBear" width={264} />
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-2 mb-6">
            <input
              className="main-input"
              placeholder="아이디를 입력해주세요"
              id="username"
              {...register("username")}
            />

            <input
              className="main-input"
              placeholder="비밀번호를 입력해주세요"
              id="password"
              type="password"
              {...register("password")}
            />
          </div>
          <button className="long-button bg-[#6E7CF2] text-white" type="submit">
            로그인
          </button>
        </form>
        <div className="flex mt-4 justify-center gap-6">
          <div className="text-[#616161] text-xs">아이디 찾기</div>

          <div className="text-[#616161] text-xs">비밀번호 찾기</div>
          <Link href="/sign-up/clause" className="text-[#616161] text-xs">
            회원가입
          </Link>
        </div>
      </div>
    </div>
  );
}
