import { TopBar } from "@/pages/components/TopBar/TopBar";
import { Overlay } from "@/pages/components/styles/Overlay";
import { SettingCard } from "@/pages/profile/components/SettingCard";
import { useState } from "react";
import { InputDialog } from "../components/InputDialog";
import api from "@/pages/api/config";
import MemberInfoDialog from "../components/MemberInfoDialog";
import { useRouter } from "next/router";

export interface IMemberInfo {
  age: string;
  deleted: boolean;
  email: string;
  gender: string;
  id: number;
  nickname: string;
  password: string;
  point: number;
  userId: string;
}

export default function Member() {
  const router = useRouter();

  const [showPopUp, setShowPopUp] = useState(false);
  const [popUpType, setPopUpType] = useState("");
  const [memberInfo, setMemberInfo] = useState<IMemberInfo>();
  return (
    <>
      <TopBar hasBack noShadow title="회원 관리" />
      <div className="white-screen flex-col justify-start pt-12">
        <div className="inner-screen">
          <SettingCard
            title="회원 정보 조회"
            onClick={() => {
              setShowPopUp((prev) => !prev);
              setPopUpType("memberInfo");
            }}
          />
          <SettingCard
            title="회원 설문조사 조회"
            onClick={() => {
              setShowPopUp((prev) => !prev);
              setPopUpType("memberSurvey");
            }}
          />
          <SettingCard
            title="회원 설문조사 참여 내역 조회"
            onClick={() => {
              setShowPopUp((prev) => !prev);
              setPopUpType("memberSurveyHistory");
            }}
          />
          <SettingCard title="회원 포인트 내역 조회" onClick={() => {}} />
          <SettingCard title="회원 상품 교환 내역 조회" onClick={() => {}} />
          <SettingCard title="포인트 지급" onClick={() => {}} />
        </div>
      </div>
      {showPopUp && (
        <>
          <Overlay onClick={() => setShowPopUp((prev) => !prev)} />
          {popUpType === "memberInfo" && (
            <InputDialog
              title="회원 정보 조회"
              placeholder="조회할 닉네임을 입력해주세요"
              rightText="조회"
              leftText="취소"
              onLeftClick={() => setShowPopUp((prev) => !prev)}
              onRightClick={(data) => {
                const nickname = data.nickname;
                if (nickname !== undefined) {
                  api
                    .get(`/role/${nickname}`)
                    .then((res) => {
                      const data = res.data;
                      setMemberInfo(data);
                      setPopUpType("memberInfoResult");
                    })
                    .catch((err) => {
                      if (err.response.status === 404) {
                        alert("존재하지 않는 닉네임입니다.");
                      }
                    });
                }
              }}
            />
          )}
          {popUpType === "memberInfoResult" && (
            <MemberInfoDialog
              info={memberInfo!}
              onBtnClick={() => setShowPopUp((prev) => !prev)}
            />
          )}
          {popUpType === "memberSurvey" && (
            <InputDialog
              title="회원 설문조사 조회"
              placeholder="조회할 닉네임을 입력해주세요"
              leftText="취소"
              rightText="조회"
              onLeftClick={() => setShowPopUp((prev) => !prev)}
              onRightClick={(data) => {
                const nickname = data.nickname;
                if (nickname !== undefined) {
                  api
                    .get(`/role/${nickname}`)
                    .then((res) => {
                      router.push(`/manager/member/survey/${nickname}`);
                    })
                    .catch((err) => alert("존재하지 않는 닉네임입니다."));
                }
              }}
            />
          )}
          {popUpType === "memberSurveyHistory" && (
            <InputDialog
              title="회원 설문조사 참여 내역 조회"
              placeholder="조회할 닉네임을 입력해주세요"
              leftText="취소"
              rightText="조회"
              onLeftClick={() => setShowPopUp((prev) => !prev)}
              onRightClick={(data) => {
                const nickname = data.nickname;
                if (nickname !== undefined) {
                  api
                    .get(`/role/${nickname}`)
                    .then((res) => {
                      router.push(`/manager/member/survey-history/${nickname}`);
                    })
                    .catch((err) => alert("존재하지 않는 닉네임입니다."));
                }
              }}
            />
          )}
        </>
      )}
    </>
  );
}
