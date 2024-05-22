// 관리자 관리
import api from "@/api/config";
import { Dialog } from "@/components/Dialog";
import { TopBar } from "@/components/TopBar/TopBar";
import { Overlay } from "@/components/styles/Overlay";
import { useOneBtnDialog } from "@/hooks/useOneBtnDialog";
import { SettingCard } from "@/pages/profile/components/SettingCard";
import { useRouter } from "next/router";
import { useState } from "react";
import { InputDialog } from "../components/InputDialog";

export default function ManagerAdministration() {
  const router = useRouter();
  const { oneBtnDialog, showOneBtnDialog, hideOneBtnDialog } =
    useOneBtnDialog();

  const [showPopUp, setShowPopUp] = useState(false);
  return (
    <>
      <TopBar hasBack noShadow title="관리자 관리" />
      <div className="white-screen flex-col justify-start pt-12">
        <div className="inner-screen">
          <SettingCard
            title="관리자 등록"
            onClick={() => {
              setShowPopUp((prev) => !prev);
            }}
          />
          <SettingCard
            title="관리자 조회"
            onClick={() => {
              router.push("/manager/administration/inquiry");
            }}
          />
          <SettingCard
            title="GPT Token 사용량 확인"
            onClick={() => {
              router.push("/manager/administration/gpt");
            }}
          />
        </div>

        {showPopUp && (
          <>
            <InputDialog
              title="새 관리자"
              placeholder="새 관리자의 닉네임을 입력해주세요"
              leftText="취소"
              onLeftClick={() => {
                setShowPopUp((prev) => !prev);
              }}
              rightText="추가"
              onRightClick={(data: any) => {
                if (data.nickname !== undefined) {
                  const nickname = data.nickname;
                  api
                    .post(`/role?nickname=${nickname}`)
                    .then((res) => {
                      showOneBtnDialog(
                        `${nickname} 님을 관리자로 등록하였습니다.`
                      );
                      setShowPopUp((prev) => !prev);
                    })
                    .catch((err) => {
                      console.error(err);
                      showOneBtnDialog(err.response.data.message);
                    });
                }
              }}
            />
            <Overlay onClick={() => {}} />
          </>
        )}

        {oneBtnDialog.open && (
          <Dialog
            title={oneBtnDialog.title}
            rightText="확인"
            onlyOneBtn
            onRightClick={hideOneBtnDialog}
          />
        )}
      </div>
    </>
  );
}
