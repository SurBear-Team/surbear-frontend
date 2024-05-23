import { IBuyInfo } from "../BuyGoodsPage";

interface IConfirmDialog {
  info: IBuyInfo;
  onLeftClick: () => void;
  onRightClick: () => void;
}

export default function ConfirmDialog({
  info,
  onLeftClick,
  onRightClick,
}: IConfirmDialog) {
  return (
    <div className="card w-4/5 p-8 fixed z-50 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <span className="text-base font-semibold">
          상품 정보를 다시 확인해주세요.
        </span>
        <span className="font-bold text-red-1">
          * 전화번호 오기입으로 인해 발생하는 잘못된 발송의 책임은 사용자에게
          있습니다.
        </span>
        <div className="text-gray-9 flex flex-col gap-1">
          <div>
            <span className="text-base font-medium">상품명 : </span>
            <span className="text-base font-bold">{info.goodsName}</span>
          </div>
          <div>
            <span className="text-base font-medium">전화번호 : </span>
            <span className="text-base font-bold">
              {info.phoneNum.replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`)}
            </span>
          </div>
          <div>
            <span className="text-base font-medium">
              구매 후 잔여 포인트 :{" "}
            </span>
            <span className="text-base font-bold">{info.remain} pt</span>
          </div>
        </div>
      </div>
      <div className="gray-line w-full" />
      <div className="flex gap-4 w-full">
        <button
          onClick={onLeftClick}
          className="long-button border-gray-5 bg-white text-gray-5"
        >
          취소
        </button>
        <button
          onClick={onRightClick}
          className="long-button primary-btn-style"
        >
          구매
        </button>
      </div>
    </div>
  );
}
