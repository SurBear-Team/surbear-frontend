import { useRouter } from "next/router";
import { MemberUpdateCard } from "../components/MemberUpdateCard";
import { useEffect, useState } from "react";
import { Overlay } from "@/pages/components/styles/Overlay";
import { AgeSheet } from "@/pages/sign-up/Components/AgeSheet";
import { TopBar } from "@/pages/components/TopBar/TopBar";
import api from "@/pages/api/config";
import { IMemberInfo } from "@/pages/manager/member";
import { getAge } from "@/pages/utils";
import { InputDialog } from "@/pages/manager/components/InputDialog";

export default function MemberUpdate() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== undefined) {
      const checkToken = localStorage.getItem("surbearToken");
      if (checkToken === null) {
        router.push("/sign-in");
      } else {
        api
          .get("/member", {
            headers: { Authorization: `Bearer ${checkToken}` },
          })
          .then((res) => {
            const info = res.data;
            setMemberInfo(info);
          })
          .catch((err) => console.log(err));
      }
    }
  }, []);

  const [memberInfo, setMemberInfo] = useState<IMemberInfo>();

  const [showNicknameDialog, setShowNicknameDialog] = useState(false);

  const [selectedAge, setSelectedAge] = useState("20대");
  const [showSheet, setShowSheet] = useState(false);

  const toggleShowSheet = () => {
    setShowSheet(!showSheet);
  };

  return (
    <>
      <TopBar hasBack title="회원 정보 수정" noShadow />
      <div className="white-screen flex-col justify-start pt-[50px]">
        <div className="inner-screen">
          <MemberUpdateCard
            title="닉네임"
            content={memberInfo?.nickname!}
            onClick={() => {
              setShowNicknameDialog((prev) => !prev);
            }}
          />

          <MemberUpdateCard
            title="나이대"
            content={getAge(memberInfo?.age!)!}
            onClick={() => {
              setShowSheet(true);
            }}
          />
        </div>

        {showNicknameDialog && (
          <>
            <div className="flex justify-center">
              <Overlay onClick={() => setShowNicknameDialog((prev) => !prev)} />
              <InputDialog
                title="새 닉네임"
                leftText="취소"
                rightText="확인"
                onLeftClick={() => setShowNicknameDialog((prev) => !prev)}
                onRightClick={(data) => {
                  console.log(data);
                }}
                placeholder="변경할 닉네임을 입력해주세요."
              />
            </div>
          </>
        )}

        {showSheet && (
          <>
            <Overlay onClick={() => setShowNicknameDialog((prev) => !prev)} />
            <AgeSheet
              showSheet={showSheet}
              onClose={toggleShowSheet}
              onSelected={setSelectedAge}
            />
          </>
        )}
      </div>
    </>
  );
}
