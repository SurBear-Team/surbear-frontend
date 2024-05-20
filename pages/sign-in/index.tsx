import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import LogoSVG from "../components/styles/LogoSVG";
import api from "../api/config";
import { AxiosError } from "axios";
import { Dialog } from "../components/Dialog";
import { useQueryClient } from "react-query";
import { useOneBtnDialog } from "../hooks/useOneBtnDialog";

export default function SignIn() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { oneBtnDialog, showOneBtnDialog, hideOneBtnDialog } =
    useOneBtnDialog();

  const [inputId, setInputId] = useState("");
  const [inputPassword, setInputPassword] = useState("");

  const onInputIdChange = (e: any) => {
    setInputId(e.target.value);
  };
  const onPasswordChange = (e: any) => {
    setInputPassword(e.target.value);
  };

  const submitData = {
    userId: inputId,
    password: inputPassword,
  };

  const onSubmit = async () => {
    try {
      const response = await api.post("/member/login", submitData);
      if (response.status === 200) {
        localStorage.setItem("surbearToken", response?.data?.accessToken);
        router.push("/browse");
        queryClient.invalidateQueries("member");
        queryClient.invalidateQueries("product-count");
        queryClient.invalidateQueries("registered");
        queryClient.invalidateQueries("participation");
        queryClient.invalidateQueries("my-surveys");
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error(axiosError);
      if (axiosError.response && axiosError.response.status === 404) {
        showOneBtnDialog("아이디 혹은 비밀번호를 확인해주세요");
      } else {
        showOneBtnDialog(
          "네트워크 에러가 발생했습니다. 나중에 다시 시도해주세요"
        );
      }
    }
  };

  return (
    <div className="white-screen">
      <div className="inner-screen">
        {/* 이거 나중에 루트로 뺌 */}
        <div className="px-12 w-full">
          <div className="flex justify-center mb-8">
            <LogoSVG />
          </div>

          <div className="flex flex-col gap-2 mb-6">
            <input
              className="main-input text-gray-9"
              placeholder="아이디를 입력해주세요"
              type="text"
              onChange={onInputIdChange}
            />

            <input
              className="main-input text-gray-9"
              placeholder="비밀번호를 입력해주세요"
              type="password"
              onChange={onPasswordChange}
            />
          </div>
          <button onClick={onSubmit} className="long-button primary-btn-style">
            로그인
          </button>

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
              비밀번호 재설정
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
            className="long-button mt-7 white-bg-primary-btn"
            onClick={() => {
              router.push("/browse");
              queryClient.invalidateQueries("member");
              queryClient.invalidateQueries("product-count");
              queryClient.invalidateQueries("registered");
              queryClient.invalidateQueries("participation");
              queryClient.invalidateQueries("my-surveys");
            }}
          >
            로그인 없이 시작
          </button>
        </div>

        {oneBtnDialog.open && (
          <Dialog
            title={oneBtnDialog.title}
            rightText="확인"
            onlyOneBtn
            onRightClick={hideOneBtnDialog}
          />
        )}
      </div>
    </div>
  );
}
