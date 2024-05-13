import { getAge } from "@/pages/utils";
import { IMemberInfo } from "../member";

interface IMemberInfoDialog {
  info: IMemberInfo;
  onBtnClick: () => void;
}

export default function MemberInfoDialog({
  info,
  onBtnClick,
}: IMemberInfoDialog) {
  return (
    <div className="card w-4/5 p-8 fixed z-50 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white flex flex-col gap-6 max-w-lg">
      <div className="flex flex-col gap-4">
        <span className="text-base font-semibold">회원 정보 조회</span>
        <div className="text-gray-9 gap-1 flex-col flex">
          <div>
            <span className="text-base font-medium">아이디 : </span>
            <span className="text-base font-bold">{info.userId}</span>
          </div>
          <div>
            <span className="text-base font-medium">닉네임 : </span>
            <span className="text-base font-bold">{info.nickname}</span>
          </div>
          <div>
            <span className="text-base font-medium">이메일 : </span>
            <span className="text-base font-bold">{info.email}</span>
          </div>
          <div>
            <span className="text-base font-medium">나이 : </span>
            <span className="text-base font-bold">{getAge(info.age)}</span>
          </div>
          <div>
            <span className="text-base font-medium">성별 : </span>
            <span className="text-base font-bold">
              {info.gender === "MALE" ? "남성" : "여성"}
            </span>
          </div>
          <div>
            <span className="text-base font-medium">잔여 포인트 : </span>
            <span className="text-base font-bold">{info.point} pt</span>
          </div>
        </div>
      </div>
      <div className="gray-line w-full" />
      <button onClick={onBtnClick} className="long-button primary-btn-style">
        확인
      </button>
    </div>
  );
}
