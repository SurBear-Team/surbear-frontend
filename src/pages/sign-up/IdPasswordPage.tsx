import { AxiosError } from "axios";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import api from "../../api/config";
import { TopBar } from "../../components/TopBar/TopBar";
import { userIdAtom, userPasswordAtom } from "./userState";

interface FormData {
  username: string;
  password: string;
  passwordConfirm: string;
}
export default function IdPassword() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm<FormData>({
    mode: "onChange",
  });

  const [, setUserId] = useRecoilState(userIdAtom);
  const [, setUserPassword] = useRecoilState(userPasswordAtom);

  // 아이디 중복검사
  const checkUserIdDuplication = async (username: string) => {
    if (!username) return false;
    try {
      await api.post("/member/verification/duplicate", {
        type: "userid",
        value: username,
      });
      return true;
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error(axiosError);
      if (axiosError.response && axiosError.response.status === 409) {
        setError("username", {
          type: "duplicate",
          message: "이미 사용 중인 아이디입니다.",
        });
      } else {
        setError("username", {
          type: "server",
          message: "서버 오류로 중복 검사를 완료할 수 없습니다.",
        });
      }
      return false;
    }
  };

  // 아이디 유효성 검사
  const validateUsername = (username: string) => {
    const isValidContent = /^[A-Za-z0-9]+$/.test(username);
    return isValidContent || "아이디는 영문과 숫자만 포함시켜주세요";
  };

  // 비밀번호 유효성 검사
  const validatePassword = (password: string) => {
    const isValidContent =
      /^[A-Za-z0-9~`!@#$%^&*()-_=+\\|{}\[\]:;"'<>,.?/]+$/.test(password);
    return (
      isValidContent ||
      "비밀번호는 영문 소문자, 대문자, 숫자, 특수문자만 포함시켜주세요"
    );
  };

  // 모든 유효성 검사 통과하고 다음 버튼 누르면 실행되는 함수
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const isUnique = await checkUserIdDuplication(data.username);
    if (isUnique) {
      setUserId(data.username);
      setUserPassword(data.password);
      router.push("/sign-up/detail");
    }
  };
  return (
    <>
      <TopBar hasBack noShadow title="회원가입" />
      <div className="white-screen px-12 flex-col w-full">
        <form
          className="inner-screen px-12 flex-col"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* 아이디 */}
          <div className="w-full relative mb-10">
            <span className="font-semibold">아이디</span>
            <input
              {...register("username", {
                validate: validateUsername,
                required: "아이디를 입력해주세요.",
                minLength: {
                  value: 6,
                  message: "아이디는 최소 6자 이상이어야 합니다.",
                },
                maxLength: {
                  value: 20,
                  message: "아이디는 최대 20자까지 입력 가능합니다.",
                },
                onBlur: (e) => checkUserIdDuplication(e.target.value),
              })}
              type="text"
              placeholder="아이디를 입력해주세요"
              className={`main-input mt-1 text-gray-9 ${
                errors.username && "border-red-1"
              }`}
            />
            {errors.username && typeof errors.username.message === "string" && (
              <p className="absolute bottom-0 translate-y-full pt-1 font-extrabold text-xs text-red-1">
                {errors.username.message}
              </p>
            )}
          </div>

          {/* 비밀번호 */}
          <div className="w-full relative mb-10">
            <span className="font-semibold">비밀번호</span>
            <input
              {...register("password", {
                required: "비밀번호를 입력해주세요.",
                validate: validatePassword,
                minLength: {
                  value: 8,
                  message: "비밀번호는 최소 8자 이상이어야 합니다.",
                },
                maxLength: {
                  value: 20,
                  message: "비밀번호는 최대 20자까지 입력 가능합니다.",
                },
              })}
              type="password"
              placeholder="비밀번호를 입력해주세요"
              className={`main-input mt-1 text-gray-9 ${
                errors.username && "border-red-1"
              }`}
            />
            {errors.password && typeof errors.password.message === "string" && (
              <p className="absolute bottom-0 translate-y-full pt-1 font-extrabold text-xs text-red-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* 비밀번호 확인 */}
          <div className="w-full relative mb-10">
            <span className="font-semibold mb-1">비밀번호 확인</span>
            <input
              {...register("passwordConfirm", {
                validate: (value) =>
                  value === watch("password") ||
                  "비밀번호가 일치하지 않습니다.",
              })}
              type="password"
              placeholder="비밀번호를 확인해주세요"
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
              className="long-button px-32 mt-8 font-semibold white-bg-primary-btn"
            >
              다음
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
