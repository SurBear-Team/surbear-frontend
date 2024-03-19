import { useRouter } from "next/router";

export default function CompleteSignUp() {
  const router = useRouter();
  return (
    <div className="screen flex-col px-12">
      <div className="flex justify-center mb-8">
        <img src="/images/surbear.png" alt="SurBear" width={146} />
      </div>
      <div className="text-center font-extrabold text-xl">
        임직찬 님 <br />
        회원가입을 축하합니다!
      </div>
      <div className="gray-line mt-12" />
      <button
        className="long-button w-full mt-8 bg-white border-[#6E7CF2] text-[#6E7CF2]"
        onClick={() => {
          router.push("/sign-in");
        }}
      >
        로그인 페이지로
      </button>
    </div>
  );
}
