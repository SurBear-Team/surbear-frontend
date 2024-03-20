import { useRouter } from "next/router";

export default function CompleteSignUp() {
  const router = useRouter();
  return (
    <div className="screen flex-col px-12">
      <div className="flex justify-center mb-8">
        <img src="/images/surbear.png" alt="SurBear" width={146} />
      </div>
      <div className="text-center font-extrabold text-xl text-gray-9">
        임직찬 님 <br />
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
