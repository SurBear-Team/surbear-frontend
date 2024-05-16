import { ArrowBackIcon } from "@/pages/components/styles/Icons";
import { useRouter } from "next/router";
import { InquiryCard } from "./components/InquiryCard";
import { useEffect, useState } from "react";
import { Dialog } from "@/pages/components/Dialog";
import { TopBar } from "@/pages/components/TopBar/TopBar";
import api from "@/pages/api/config";

export interface IManagerList {
  memberId: number;
  nickname: string;
  roleId: number;
}

export default function AdministrationInquiry() {
  const router = useRouter();
  const [managerList, setManagerList] = useState<IManagerList[]>();
  const [selectedManager, setSelectedManager] = useState<IManagerList>();
  const [updateList, setUpdateList] = useState(0);

  useEffect(() => {
    api.get("/role/list").then((res) => {
      setManagerList(res.data);
    });
  }, [updateList]);

  const [showPopUp, setShowPopUp] = useState(false);
  return (
    <>
      <TopBar hasBack noShadow title="관리자 조회" />
      <div className="white-screen flex-col justify-start pt-12">
        <div className="inner-screen">
          {managerList !== undefined &&
            managerList.map((el) => (
              <InquiryCard
                key={el.roleId}
                onClick={() => {
                  setSelectedManager(el);
                  setShowPopUp((prev) => !prev);
                }}
                title={`${el.nickname}`}
              />
            ))}
        </div>
        {showPopUp && (
          <>
            <Dialog
              title={`${`${selectedManager?.nickname} 님을 
              관리자에서 삭제하시겠습니까?`}`}
              leftText="취소"
              onLeftClick={() => {
                setShowPopUp((prev) => !prev);
              }}
              rightText="확인"
              onRightClick={() => {
                api
                  .delete(`/role/${selectedManager?.roleId}`)
                  .then((res) => {
                    alert(
                      `${selectedManager?.nickname} 님의 관리자 권한을 삭제하였습니다.`
                    );
                    setShowPopUp((prev) => !prev);
                    setUpdateList((prev) => prev + 1);
                  })
                  .catch((err) => alert("관리자 삭제에 실패하였습니다."));
              }}
              isDelete={true}
            />
          </>
        )}
      </div>
    </>
  );
}
