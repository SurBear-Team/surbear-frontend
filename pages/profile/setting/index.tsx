import { useRouter } from "next/router";
import { SettingCard } from "../components/SettingCard";
import { useEffect, useState } from "react";
import { Dialog } from "@/pages/components/Dialog";
import { TopBar } from "@/pages/components/TopBar/TopBar";
import api from "@/pages/api/config";
import { IMemberInfo } from "@/pages/manager/member";
import { useQuery } from "react-query";

export default function ProfileSetting() {
  const router = useRouter();
  const [token, setToken] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem("surbearToken");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const fetchMember = async () => {
    const { data } = await api.get("/member", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  };
  const { data: memberInfo } = useQuery<IMemberInfo>(["member"], fetchMember, {
    enabled: !!token,
    staleTime: 1000 * 5 * 60,
    cacheTime: 1000 * 5 * 60,
  });

  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [showWithdrawalDialog, setShowWithdrawalDialog] = useState(false);
  return (
    <>
      <TopBar title="설정" hasBack noShadow />
      <div className="white-screen flex-col justify-start pt-[50px]">
        <div className="inner-screen">
          <SettingCard
            title="회원 정보 조회"
            onClick={() => {
              router.push("/profile/setting/update");
            }}
          />
          <SettingCard
            title="로그아웃"
            onClick={() => {
              setShowLogoutDialog(true);
            }}
          />
          <SettingCard
            title="회원 탈퇴"
            onClick={() => {
              setShowWithdrawalDialog(true);
            }}
          />
        </div>
        {showLogoutDialog && (
          <>
            <div className="flex justify-center">
              <Dialog
                title="로그아웃 하시겠습니까?"
                leftText="취소"
                onLeftClick={() => {
                  setShowLogoutDialog((prev) => !prev);
                }}
                rightText="확인"
                onRightClick={() => {
                  alert("로그아웃이 완료되었습니다.");
                  localStorage.removeItem("surbearToken");
                  router.push("/sign-in");
                }}
                isDelete={true}
              />
            </div>
          </>
        )}

        {showWithdrawalDialog && (
          <>
            <div className="flex justify-center">
              <Dialog
                title="회원을 탈퇴하시겠습니까?"
                leftText="취소"
                onLeftClick={() => {
                  setShowWithdrawalDialog((prev) => !prev);
                }}
                rightText="확인"
                onRightClick={() => {
                  api
                    .delete(`/member/${memberInfo?.id}`)
                    .then((res) => {
                      alert("회원 탈퇴가 완료되었습니다.");
                      localStorage.removeItem("surbearToken");
                      router.push("/sign-in");
                    })
                    .catch((res) =>
                      alert("오류가 발생하였습니다. 다시 시도해주세요.")
                    );
                }}
                isDelete={true}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
}
