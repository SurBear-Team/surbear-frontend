import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ProfileCard } from "./components/ProfileCard";
import { TabBar } from "../components/TabBar";
import { TopBar } from "../components/TopBar/TopBar";
import api from "../api/config";
import { IMemberInfo } from "../manager/member";
import { Dialog } from "../components/Dialog";

export default function Profile() {
  const router = useRouter();
  // 로그인 여부 감지
  useEffect(() => {
    if (typeof window !== undefined) {
      const checkToken = localStorage.getItem("surbearToken");
      if (checkToken === null) {
        setOneBtnDialog({
          open: true,
          title: "로그인이 필요한 서비스입니다",
        });
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
        api
          .get("/member/profile/counting/participation", {
            headers: { Authorization: `Bearer ${checkToken}` },
          })
          .then((res) => setParticipated(res.data))
          .catch((err) => console.log(err));
        api
          .get("/member/profile/counting/survey", {
            headers: { Authorization: `Bearer ${checkToken}` },
          })
          .then((res) => setRegistered(res.data))
          .catch((err) => console.log(err));
        api
          .get("/product/history/counting", {
            headers: { Authorization: `Bearer ${checkToken}` },
          })
          .then((res) => setProductCount(res.data))
          .catch((err) => console.log(err));
      }
    }
  }, []);
  const [oneBtnDialog, setOneBtnDialog] = useState({
    open: false,
    title: "",
  });

  const [memberInfo, setMemberInfo] = useState<IMemberInfo>();

  const [productCount, setProductCount] = useState(0);
  const [registered, setRegistered] = useState(0);
  const [participated, setParticipated] = useState(0);
  return (
    <>
      <TopBar title={memberInfo?.nickname!} hasSetting />
      <div className="screen px-6 pt-[66px] bg-[#F8F8F8] flex-col gap-3 justify-start">
        <ProfileCard
          title="현재 포인트"
          content={`${
            memberInfo?.point !== undefined
              ? memberInfo.point.toLocaleString()
              : ""
          } pt`}
          onClick={() => {
            router.push("/profile/point-history");
          }}
        />
        <ProfileCard
          title="상품 교환 횟수"
          content={`${productCount} 번`}
          onClick={() => {
            router.push("/profile/payments-history");
          }}
        />
        <ProfileCard
          title="제작한 설문조사 개수"
          content={`${registered} 번`}
          onClick={() => {
            router.push("/profile/my-survey-history");
          }}
        />
        <ProfileCard
          title="참여한 설문조사 개수"
          content={`${participated} 개`}
          onClick={() => {
            router.push("/profile/participation-history");
          }}
        />
      </div>
      <TabBar />
      {oneBtnDialog.open && (
        <Dialog
          onlyOneBtn
          title={oneBtnDialog.title}
          rightText="확인"
          onRightClick={() => {
            router.push("/sign-in");
          }}
        />
      )}
    </>
  );
}
