import { TopBar } from "@/pages/components/TopBar";
import { ArrowBackIcon } from "@/pages/components/styles/Icons";
import { useRouter } from "next/router";
import { InquiryCard } from "./components/InquiryCard";
import { useState } from "react";
import { Dialog } from "@/pages/components/Dialog";
import { Overlay } from "@/pages/components/styles/Overlay";

export default function AdministrationInquiry() {
  const router = useRouter();
  let ManagerList = ["관리자1", "관리자2", "관리자3"];

  const [showPopUp, setShowPopUp] = useState(false);
  return (
    <>
      <TopBar
        leftSVG={<ArrowBackIcon />}
        onLeftClick={() => {
          router.back();
        }}
        title="관리자 조회"
      />
      <div className="screen flex-col justify-start pt-[66px]">
        {ManagerList.map((index) => (
          <InquiryCard
            key={index}
            onClick={() => {
              setShowPopUp((prev) => !prev);
            }}
            title={`${index}`}
          />
        ))}
        {showPopUp && (
          <>
            <Dialog
              title={`${`관리자1 님을 
              관리자에서 삭제하시겠습니까?`}`}
              leftText="취소"
              onLeftClick={() => {
                setShowPopUp((prev) => !prev);
              }}
              rightText="확인"
              onRightClick={() => {
                console.log("관리자 삭제");
              }}
              isDelete={true}
            />
          </>
        )}
      </div>
    </>
  );
}
