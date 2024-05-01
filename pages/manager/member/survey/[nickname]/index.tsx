import api from "@/pages/api/config";
import { ISurvey } from "@/pages/browse/data";
import { Dialog } from "@/pages/components/Dialog";
import { TopBar } from "@/pages/components/TopBar/TopBar";
import { Overlay } from "@/pages/components/styles/Overlay";
import { ListCard } from "@/pages/profile/components/ListCard";
import { getTimeAsString } from "@/pages/utils";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function MemberSurvey() {
  const router = useRouter();

  const [showPopUp, setShowPopUp] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  const [updateList, setUpdateList] = useState(0);

  const [data, setData] = useState<ISurvey[]>();
  const { nickname } = router.query;
  useEffect(() => {
    if (nickname !== undefined) {
      api.get(`/role/participating`, { params: { nickname } }).then((res) => {
        const data = res.data;
        setData(data);
      });
    }
  }, [updateList, nickname]);

  const [token, setToken] = useState("");
  useEffect(() => {
    if (typeof window !== undefined) {
      const checkToken = localStorage.getItem("surbearToken");
      if (checkToken !== null) {
        setToken(checkToken);
      }
    }
  });

  return (
    <>
      <TopBar hasBack noShadow title="회원 설문조사 내역" />
      <div className="white-screen flex-col pt-[50px] justify-start">
        <div className="inner-screen">
          {data?.map((el) => (
            <ListCard
              key={el.id}
              getTime={
                getTimeAsString(el.startDate) === null
                  ? "시작 전"
                  : getTimeAsString(el.startDate)
              }
              content={el.title}
              status={el.ongoingType}
              hasBan
              onBanClick={() => {
                if (
                  el.ongoingType !== "DELETION" &&
                  el.ongoingType !== "FORCED_DELETION"
                ) {
                  setShowPopUp((prev) => !prev);
                  setSelected(el.id);
                } else {
                  alert("이미 삭제된 설문조사입니다.");
                }
              }}
            />
          ))}
        </div>
      </div>
      {showPopUp && (
        <>
          <Overlay onClick={() => setShowPopUp((prev) => !prev)} />
          <Dialog
            leftText="취소"
            onLeftClick={() => setShowPopUp((prev) => !prev)}
            rightText="삭제"
            onRightClick={() => {
              if (selected !== null && token !== "") {
                api
                  .delete("/deletion", {
                    data: {
                      surveyId: selected,
                    },
                    headers: { Authorization: `Bearer ${token}` },
                  })
                  .then((res) => {
                    alert("설문조사가 강제 삭제 되었습니다.");
                    setUpdateList((prev) => prev + 1);
                    setShowPopUp((prev) => !prev);
                  })
                  .catch((err) => {
                    alert("이미 삭제된 설문조사입니다.");
                    setShowPopUp((prev) => !prev);
                  });
              } else if (token === "") {
                alert("관리자 권한이 필요합니다.");
              }
            }}
            title="해당 설문조사를 강제 삭제하시겠습니까?"
            isDelete
          />
        </>
      )}
    </>
  );
}
