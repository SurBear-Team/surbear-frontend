import { TopBar } from "@/pages/components/TopBar/TopBar";
import { useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import api from "@/pages/api/config";
import { useRecoilState, useRecoilValue } from "recoil";
import { findIdAtom } from "../findStatus";
import { Dialog } from "@/pages/components/Dialog";

interface DialogState {
  open: boolean;
  title: string;
}

export default function NewPwd() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useRecoilState(findIdAtom);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const [dialog, setDialog] = useState<DialogState>({
    open: false,
    title: "",
  });

  // 비밀번호 유효성 검사
  const validatePassword = (password: string) => {
    const isValidContent = /^[A-Za-z0-9]+$/.test(password);
    return (
      isValidContent || "비밀번호는 영문 소문자, 대문자, 숫자만 포함시켜주세요"
    );
  };

  const onSubmit = async (data: any) => {
    try {
      const response = await api.post("/member/password", {
        email: userEmail,
        newPassword: data.password,
      });

      console.log(response);
      if (response.status === 200) {
        router.push("/sign-in/find-pwd/done");
        setUserEmail("");
      }
    } catch (error) {
      console.error("Axios 요청 에러:", error);
      setDialog({
        open: true,
        title: "네트워크 오류가 발생했어요",
      });
    }
  };
  return (
    <>
      <TopBar hasBack title="비밀번호 찾기" noShadow />
      <div className="white-screen flex-col">
        <div className="inner-screen px-10">
          <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
            <div className="w-full relative mb-10">
              <span className="font-semibold">새 비밀번호</span>
              <input
                {...register("password", {
                  required: "새 비밀번호를 입력해주세요",
                  validate: validatePassword,
                  minLength: {
                    value: 8,
                    message: "비밀번호는 최소 8자 이상이어야 합니다.",
                  },
                })}
                type="password"
                placeholder="비밀번호를 입력해주세요"
                className={`main-input mt-1 text-gray-9 ${
                  errors.username && "border-red-1"
                }`}
              />
              {errors.password &&
                typeof errors.password.message === "string" && (
                  <p className="absolute bottom-0 translate-y-full pt-1 font-extrabold text-xs text-red-1">
                    {errors.password.message}
                  </p>
                )}
            </div>

            {/* 비밀번호 확인 */}
            <div className="w-full relative mb-10">
              <span className="font-semibold mb-1">새 비밀번호 확인</span>
              <input
                {...register("passwordConfirm", {
                  validate: (value) =>
                    value === watch("password") ||
                    "비밀번호가 일치하지 않습니다.",
                })}
                type="password"
                placeholder="비밀번호를 다시 입력해주세요"
                className={`main-input mt-1 text-gray-9 ${
                  errors.username && "border-red-1"
                }`}
              />
              {errors.passwordConfirm &&
                typeof errors.passwordConfirm.message === "string" && (
                  <p className="absolute bottom-0 translate-y-full pt-1 font-extrabold text-xs text-red-1">
                    {errors.passwordConfirm.message}
                  </p>
                )}
            </div>

            <div className="gray-line w-full mt-12" />

            <div className="w-full">
              <button
                type="submit"
                className="long-button px-32 mt-8 font-semibold bg-white border-primary-1 text-primary-1"
              >
                다음
              </button>
            </div>
          </form>

          {dialog.open && (
            <Dialog
              title={dialog.title}
              rightText="확인"
              onRightClick={() => {
                setDialog((current) => ({ ...current, open: false }));
              }}
              onlyOneBtn
            />
          )}
        </div>
      </div>
    </>
  );
}
