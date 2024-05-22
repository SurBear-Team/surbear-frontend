import api from "@/api/config";
import { Dialog } from "@/components/Dialog";
import { TopBar } from "@/components/TopBar/TopBar";
import { Overlay } from "@/components/styles/Overlay";
import { InputDialog } from "@/pages/manager/components/InputDialog";
import { IMemberInfo } from "@/pages/manager/member/Member";
import { AgeSheet } from "@/pages/sign-up/Components/AgeSheet";
import { getAge, getConstAge } from "@/pages/utils";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import { MemberUpdateCard } from "../components/MemberUpdateCard";

export default function MemberUpdate() {
  const router = useRouter();
  const [updateList, setUpdateList] = useState(0);
  const queryClient = useQueryClient();

  const [token, setToken] = useState("");

  const [showDialog, setShowDialog] = useState({
    open: false,
    title: "",
  });
  const openDialog = (title: string) => {
    setShowDialog({ open: true, title: title });
  };
  const hideDialog = () => {
    setShowDialog({ open: false, title: "" });
  };

  useEffect(() => {
    if (typeof window !== undefined) {
      const checkToken = localStorage.getItem("surbearToken");
      if (checkToken === null) {
        router.push("/sign-in");
      } else {
        setToken(checkToken);
        api
          .get("/member", {
            headers: { Authorization: `Bearer ${checkToken}` },
          })
          .then((res) => {
            const info = res.data;
            setMemberInfo(info);
          })
          .catch((err) => console.error(err));
      }
    }
  }, [updateList]);

  const [memberInfo, setMemberInfo] = useState<IMemberInfo>();
  const [nickname, setNickname] = useState("");
  const [age, setAge] = useState("");
  useEffect(() => {
    if (memberInfo) {
      setNickname(memberInfo.nickname);
      setAge(memberInfo.age);
    }
  }, [memberInfo]);

  const [showNicknameDialog, setShowNicknameDialog] = useState(false);

  const [showSheet, setShowSheet] = useState(false);

  const toggleShowSheet = () => {
    setShowSheet(!showSheet);
  };
  return (
    <>
      <TopBar hasBack title="회원 정보 조회" noShadow />
      <div className="white-screen flex-col justify-start pt-[50px]">
        <div className="inner-screen">
          <MemberUpdateCard
            title="이메일"
            content={memberInfo?.email!}
            onClick={() => {
              setShowNicknameDialog((prev) => !prev);
            }}
          />
          <MemberUpdateCard
            title="닉네임"
            content={memberInfo?.nickname!}
            onClick={() => {
              setShowNicknameDialog((prev) => !prev);
            }}
            hasEdit
          />
          <MemberUpdateCard
            title="나이대"
            content={getAge(memberInfo?.age!)!}
            onClick={() => {
              setShowSheet(true);
            }}
            hasEdit
          />
          <MemberUpdateCard
            title="성별"
            content={memberInfo?.gender === "MALE" ? "남성" : "여성"}
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
                  if (data.nickname !== undefined) {
                    api
                      .post("/member/verification/duplicate", {
                        type: "nickname",
                        value: data.nickname,
                      })
                      .then((res) => {
                        setNickname(data.nickname);
                        if (res.data) {
                          api
                            .put(
                              "/member/information",
                              { age: age, nickname: data.nickname },
                              { headers: { Authorization: `Bearer ${token}` } }
                            )
                            .then((res) => {
                              openDialog("회원 정보가 수정되었습니다");
                              setShowNicknameDialog((prev) => !prev);
                              setUpdateList((prev) => prev + 1);
                              queryClient.invalidateQueries("member");
                            })
                            .catch((err) =>
                              openDialog(
                                "네트워크 오류가 발생했습니다. 나중에 다시 시도해주세요"
                              )
                            );
                        }
                      })
                      .catch((err) => openDialog("중복된 닉네임입니다."));
                  }
                }}
                placeholder="변경할 닉네임을 입력해주세요."
              />
            </div>
          </>
        )}

        {showSheet && (
          <>
            <Overlay onClick={() => setShowSheet((prev) => !prev)} />
            <AgeSheet
              showSheet={showSheet}
              onClose={toggleShowSheet}
              onSelected={(selectedAge: string) => {
                const newAge = getConstAge(selectedAge);
                api
                  .put(
                    "/member/information",
                    { age: newAge, nickname: nickname },
                    { headers: { Authorization: `Bearer ${token}` } }
                  )
                  .then((res) => {
                    setUpdateList((prev) => prev + 1);
                    queryClient.invalidateQueries("member");
                  })
                  .catch((err) =>
                    openDialog(
                      "네트워크 오류가 발생하였습니다. 다시 시도해주세요"
                    )
                  );
              }}
            />
          </>
        )}

        {showDialog.open && (
          <Dialog
            title={showDialog.title}
            onlyOneBtn
            rightText="확인"
            onRightClick={hideDialog}
          />
        )}
      </div>
    </>
  );
}
