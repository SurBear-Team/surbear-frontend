import api from "@/pages/api/config";
import { Dialog } from "@/pages/components/Dialog";
import { TopBar } from "@/pages/components/TopBar/TopBar";
import { useOneBtnDialog } from "@/pages/hooks/useOneBtnDialog";
import { ListCard } from "@/pages/profile/components/ListCard";
import { getTimeAsString } from "@/pages/utils";
import { useEffect, useState } from "react";

interface IPointHistory {
  id: number;
  payer: string;
  recipient: string;
  description: string;
  paidPoint: number;
  paymentType: string;
  deleted: boolean;
  updatedAt: string;
}

export default function PointHistory() {
  const [updateList, setUpdateList] = useState(0);

  const { oneBtnDialog, showOneBtnDialog, hideOneBtnDialog } =
    useOneBtnDialog();
  const [data, setData] = useState<IPointHistory[]>();
  useEffect(() => {
    api.get("/point").then((res) => setData(res.data.reverse()));
  }, [updateList]);

  const [token, setToken] = useState("");
  useEffect(() => {
    if (typeof window !== undefined) {
      if (localStorage.getItem("surbearToken") !== undefined) {
        setToken(localStorage.getItem("surbearToken")!);
      }
    }
  }, []);

  const [showWarning, setShowWarning] = useState(false);
  const [id, setId] = useState<null | number>();

  return (
    <>
      <TopBar title="포인트 지급 내역" hasBack noShadow />
      <div className="white-screen flex-col justify-start pt-[66px]">
        <div className="inner-screen">
          {data?.map((el) => {
            return (
              <ListCard
                key={el.id}
                getTime={getTimeAsString(el.updatedAt)}
                content={`${el.recipient} 에게 ${el.paidPoint} 포인트 지급`}
                surveyOwner={`지급자 : ${el.payer}`}
                hasCancel
                onCancelClick={() => {
                  setId(el.id);
                  setShowWarning((prev) => !prev);
                }}
              />
            );
          })}
        </div>
      </div>
      {showWarning && (
        <Dialog
          isDelete
          title="포인트 지급을 취소하시겠습니까?"
          leftText="취소"
          rightText="확인"
          onLeftClick={() => setShowWarning((prev) => !prev)}
          onRightClick={() =>
            api
              .post(
                "/point/canceling",
                {},
                {
                  headers: { Authorization: `Bearer ${token}` },
                  params: { pointHistoryId: id },
                }
              )
              .then((res) => {
                showOneBtnDialog("지급이 취소되었습니다.");
                setUpdateList((prev) => prev + 1);
                setShowWarning((prev) => !prev);
              })
              .catch((err) => showOneBtnDialog("사용자 인증을 확인해주세요."))
          }
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
  );
}
