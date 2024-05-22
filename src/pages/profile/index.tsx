import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import api from "../api/config";
import { Dialog } from "../components/Dialog";
import { TabBar } from "../components/TabBar";
import { TopBar } from "../components/TopBar/TopBar";
import { IMemberInfo } from "../manager/member";
import { ProfileCard } from "./components/ProfileCard";

export default function Profile() {
  const router = useRouter();
  const [token, setToken] = useState("");
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
        setToken(checkToken);
      }
    }
  }, []);

  const [oneBtnDialog, setOneBtnDialog] = useState({
    open: false,
    title: "",
  });

  // 회원 정보
  const fetchMember = async () => {
    const { data } = await api.get("/member", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  };
  const { data: memberInfo } = useQuery<IMemberInfo>(["member"], fetchMember, {
    enabled: !!token,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 5,
  });

  // 상품 교환 횟수
  const fetchProductCount = async () => {
    const { data } = await api.get("/product/history/counting", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  };
  const { data: productCount } = useQuery(
    ["product-count"],
    fetchProductCount,
    {
      enabled: !!token,
      staleTime: 1000 * 60 * 5,
      cacheTime: 1000 * 60 * 5,
    }
  );

  // 제작한 설문조사 개수
  const fetchRegistered = async () => {
    const { data } = await api.get("/member/profile/counting/survey", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  };
  const { data: registered } = useQuery(["registered"], fetchRegistered, {
    enabled: !!token,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 5,
  });

  // 참여한 설문조사 개수
  const fetchParticipation = async () => {
    const { data } = await api.get("/member/profile/counting/participation", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  };
  const { data: participation } = useQuery(
    ["participation"],
    fetchParticipation,
    {
      enabled: !!token,
      staleTime: 1000 * 60 * 5,
      cacheTime: 1000 * 60 * 5,
    }
  );

  return (
    <>
      <TopBar title={memberInfo?.nickname!} hasSetting />

      {token && (
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
            content={`${participation} 개`}
            onClick={() => {
              router.push("/profile/participation-history");
            }}
          />
        </div>
      )}
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
