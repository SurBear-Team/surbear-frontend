import api from "@/api/config";
import { Dialog } from "@/components/Dialog";
import { TopBar } from "@/components/TopBar/TopBar";
import { Overlay } from "@/components/styles/Overlay";
import { useOneBtnDialog } from "@/hooks/useOneBtnDialog";
import { SettingCard } from "@/pages/profile/components/SettingCard";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { InputDialog } from "../components/InputDialog";
import MemberInfoDialog from "../components/MemberInfoDialog";

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
  const [token, setToken] = useState("");
  useEffect(() => {
    if (typeof window !== undefined) {
      if (localStorage.getItem("surbearToken") !== undefined) {
        setToken(localStorage.getItem("surbearToken")!);
      }
    }
  }, []);

  const { oneBtnDialog, showOneBtnDialog, hideOneBtnDialog } =
    useOneBtnDialog();

  const [showPopUp, setShowPopUp] = useState(false);
  const [popUpType, setPopUpType] = useState("");
  const [memberInfo, setMemberInfo] = useState<IMemberInfo>();

  const [selectedMember, setSelectedMember] = useState<null | string>();
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
          <SettingCard
            title="회원 포인트 내역 조회"
            onClick={() => {
              setShowPopUp((prev) => !prev);
              setPopUpType("memberPointHistory");
            }}
          />
          <SettingCard
            title="회원 상품 교환 내역 조회"
            onClick={() => {
              setShowPopUp((prev) => !prev);
              setPopUpType("memberGoodsHistory");
            }}
          />
          <SettingCard
            title="포인트 지급"
            onClick={() => {
              setShowPopUp((prev) => !prev);
              setPopUpType("givePoint");
            }}
          />
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
                        showOneBtnDialog("존재하지 않는 닉네임입니다.");
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
                    .catch((err) =>
                      showOneBtnDialog("존재하지 않는 닉네임입니다.")
                    );
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
                    .catch((err) =>
                      showOneBtnDialog("존재하지 않는 닉네임입니다.")
                    );
                }
              }}
            />
          )}
          {popUpType === "givePoint" && (
            <InputDialog
              title="포인트 지급"
              placeholder="지급할 닉네임을 입력해주세요"
              leftText="취소"
              rightText="확인"
              onLeftClick={() => setShowPopUp((prev) => !prev)}
              onRightClick={(data) => {
                if (data.nickname !== undefined) {
                  api
                    .get(`/role/${data.nickname}`)
                    .then((res) => {
                      setSelectedMember(data.nickname);
                      setPopUpType("decidePoint");
                    })
                    .catch((err) =>
                      showOneBtnDialog("존재하지 않는 사용자입니다.")
                    );
                }
              }}
            />
          )}
          {popUpType === "decidePoint" && (
            <InputDialog
              title={`${selectedMember} 님에게 포인트 지급`}
              placeholder="지급할 포인트를 입력해주세요."
              leftText="취소"
              rightText="확인"
              onLeftClick={() => setShowPopUp((prev) => !prev)}
              onRightClick={(data) => {
                if (data.nickname !== undefined) {
                  const point = +data.nickname;
                  if (isNaN(point)) {
                    showOneBtnDialog("숫자만 입력해주세요.");
                  } else {
                    api
                      .post(
                        "/point",
                        {},
                        {
                          headers: { Authorization: `Bearer ${token}` },
                          params: {
                            nickname: selectedMember,
                            paidPoint: point,
                          },
                        }
                      )
                      .then((res) => {
                        alert("포인트 지급이 완료되었습니다.");
                        setShowPopUp((prev) => !prev);
                      })
                      .catch((err) =>
                        showOneBtnDialog("사용자 인증을 다시 확인해주세요.")
                      );
                  }
                }
              }}
            />
          )}
          {popUpType === "memberGoodsHistory" && (
            <InputDialog
              title="회원 상품 교환 내역 조회"
              placeholder="조회할 닉네임을 입력해주세요"
              leftText="취소"
              rightText="조회"
              onLeftClick={() => setShowPopUp((prev) => !prev)}
              onRightClick={(data) => {
                if (data.nickname !== undefined) {
                  const nickname = data.nickname;
                  api
                    .get(`/role/${nickname}`)
                    .then((res) => {
                      router.push(`/manager/member/goods-history/${nickname}`);
                    })
                    .catch((err) =>
                      showOneBtnDialog("존재하지 않는 닉네임입니다.")
                    );
                }
              }}
            />
          )}
          {popUpType === "memberPointHistory" && (
            <InputDialog
              title="회원 포인트 내역 조회"
              placeholder="조회할 닉네임을 입력해주세요"
              leftText="취소"
              rightText="조회"
              onLeftClick={() => setShowPopUp((prev) => !prev)}
              onRightClick={(data) => {
                if (data.nickname !== undefined) {
                  const nickname = data.nickname;
                  api
                    .get(`/role/${nickname}`)
                    .then((res) => {
                      router.push(`/manager/member/point-history/${nickname}`);
                    })
                    .catch((err) =>
                      showOneBtnDialog("존재하지 않는 닉네임입니다.")
                    );
                }
              }}
            />
          )}

          {oneBtnDialog.open && (
            <Dialog
              title={oneBtnDialog.title}
              rightText="확인"
              onlyOneBtn
              onRightClick={hideOneBtnDialog}
            />
          )}
        </>
      )}
    </>
  );
}
