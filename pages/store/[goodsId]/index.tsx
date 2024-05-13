import { TopBar } from "@/pages/components/TopBar/TopBar";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { IGoodsDetail } from "../components/ItemDetail";
import api from "@/pages/api/config";
import { Overlay } from "@/pages/components/styles/Overlay";
import { Checkbox } from "@/pages/sign-up/Components/CheckBox";
import { useForm } from "react-hook-form";
import ConfirmDialog from "../components/ConfirmDialog";

export interface IBuyInfo {
  goodsName: string;
  phoneNum: string;
  remain: number;
}

export default function BuyGoods() {
  const router = useRouter();
  const { goodsId } = router.query;

  // 상품 정보 조회 및 가격 저장
  const [data, setData] = useState<IGoodsDetail>();
  const [price, setPrice] = useState<null | number>();
  useEffect(() => {
    if (goodsId !== undefined) {
      api
        .get("/external", { params: { goodsCode: goodsId } })
        .then((res) => {
          setData(res.data.result.goodsDetail);
          setPrice(+res.data.result.goodsDetail.salePrice);
        })
        .catch((err) => console.log(err));
    }
  }, [goodsId]);

  // 사용자 인가 확인 및 포인트 조회
  const [token, setToken] = useState("");
  const [point, setPoint] = useState<null | number>();
  useEffect(() => {
    if (typeof window !== undefined) {
      if (localStorage.getItem("surbearToken") !== undefined) {
        const tempToken = localStorage.getItem("surbearToken");
        setToken(tempToken!);
        api
          .get("/member", {
            headers: { Authorization: `Bearer ${tempToken}` },
          })
          .then((res) => {
            if (res.data.point !== undefined) {
              setPoint(res.data.point);
            }
          })
          .catch((err) => console.log(err));
      }
    }
  }, []);

  // 구매 후 잔여 포인트 계산
  const [remain, setRemain] = useState(0);
  useEffect(() => {
    if (point !== undefined && price !== undefined) {
      setRemain(point! - price!);
    }
  }, [point, price]);

  const [showDialog, setShowDialog] = useState(false);

  // 전화번호 입력 및 submit 처리
  const [info, setInfo] = useState<IBuyInfo>();
  const { register, handleSubmit } = useForm();
  const onSubmit = (num: any) => {
    const { phoneNum } = num;
    if (remain < 0) {
      alert("포인트가 부족합니다.");
    } else if (isNaN(+phoneNum)) {
      alert("전화번호는 숫자만 입력해주세요.");
    } else if (phoneNum.length !== 11) {
      alert("올바른 전화번호를 입력해주세요.");
    } else if (checkItems.length !== terms.length) {
      alert("약관에 동의해주세요.");
    } else {
      setInfo({
        goodsName: data?.goodsName!,
        phoneNum: phoneNum,
        remain: remain,
      });
      setShowDialog((prev) => !prev);
    }
  };

  // 약관
  const terms = [
    { id: 0, title: "개인 정보 제3자 제공 동의" },
    { id: 1, title: "기프티쇼 상품 구매 동의 및 주의 사항" },
  ];
  const [checkItems, setCheckItems] = useState<number[]>([]);
  const onSingleCheck = (checked: boolean, id: number) => {
    if (checked) setCheckItems((prev) => [...prev, id]);
    else setCheckItems(checkItems.filter((el) => el !== id));
  };
  const onAllCheck = (checked: boolean) => {
    if (checked) {
      const idArray: number[] = [];
      terms.forEach((el) => idArray.push(el.id));
      setCheckItems(idArray);
    } else {
      setCheckItems([]);
    }
  };

  return (
    <>
      <TopBar hasBack title="상품 구매" />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="white-screen pt-12 pb-0"
      >
        <div className="w-full h-full flex flex-col gap-4 pt-4 items-center overflow-y-scroll">
          <div className="px-6 w-full max-w-xl gap-2 flex flex-col">
            <span className="font-semibold text-base text-gray-9">
              구매 상품 정보
            </span>
            <div className="flex gap-4 items-center">
              <img
                className="w-24 h-24 border border-gray-4 rounded-lg overflow-hidden shrink-0"
                src={data?.goodsImgB}
              />
              <div className="flex flex-col">
                <div className="flex flex-col gap-3 w-full">
                  <div className="flex flex-col">
                    <span className="text-base font-semibold text-gray-9">
                      {data?.goodsName}
                    </span>
                    <span className="text-xs font-semibold text-gray-5 whitespace-nowrap">
                      {data?.brandName}
                    </span>
                  </div>
                  <span className="text-gray-9 text-base font-bold">
                    {`${(+data?.salePrice!).toLocaleString()} pt`}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="gray-line w-full h-4" />
          <div className="px-6 w-full max-w-xl flex flex-col gap-2">
            <span className="font-semibold text-base text-gray-9">
              결제 정보
            </span>
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-1">
                <div className="flex gap-1 items-center font-bold text-lg">
                  <span className="text-sm text-gray-5 font-semibold">
                    현재 포인트 :
                  </span>
                  {`${point?.toLocaleString()} pt`}
                </div>
                <div className="flex gap-1 items-center font-bold text-lg">
                  <span className="text-sm text-gray-5 font-semibold">
                    차감 포인트 :
                  </span>
                  {`${price?.toLocaleString()} pt`}
                </div>
              </div>
              <div className="gray-line w-full" />
              <div className="flex gap-1 items-center font-bold text-lg">
                <span className="text-sm text-gray-5 font-semibold">
                  잔여 포인트 :
                </span>
                {`${remain.toLocaleString()} pt`}
              </div>
            </div>
          </div>
          <div className="gray-line w-full h-4" />
          <div className="px-6 w-full max-w-xl flex flex-col gap-4">
            <span className="font-semibold text-base text-gray-9">
              발송 정보 입력
            </span>
            <div className="flex items-center gap-4">
              <span className="whitespace-nowrap font-semibold">전화번호</span>
              <input
                {...register("phoneNum")}
                className="main-input"
                placeholder="- 을 제외한 전화번호를 입력해주세요."
              />
            </div>
          </div>
          <div className="gray-line w-full h-4" />
          <div className="px-6 w-full max-w-xl flex flex-col">
            <span className="font-semibold text-base text-gray-9">
              구매 전 약관 동의
            </span>
            <div className="flex flex-col">
              <Checkbox
                inputChecked={checkItems.length === terms.length}
                label="전체 동의"
                onClick={() =>
                  onAllCheck(!(checkItems.length === terms.length))
                }
                isAll
              />
              {terms.map((el) => (
                <Checkbox
                  key={el.id}
                  inputChecked={checkItems.includes(el.id)}
                  label={el.title}
                  onClick={() =>
                    onSingleCheck(!checkItems.includes(el.id), el.id)
                  }
                />
              ))}
            </div>
          </div>
          <div className="gray-line w-full -mt-2" />
          <div className="px-6 w-full max-w-xl pb-4">
            <button type="submit" className="long-button primary-btn-style">
              구매하기
            </button>
          </div>
        </div>
      </form>
      {showDialog && (
        <>
          <Overlay onClick={() => setShowDialog((prev) => !prev)} />
          <ConfirmDialog
            info={info!}
            onLeftClick={() => {
              setShowDialog((prev) => !prev);
            }}
            onRightClick={() => {
              api
                .post(
                  "/product",
                  {
                    price: price,
                    paymentItemName: data?.goodsName,
                  },
                  { headers: { Authorization: `Bearer ${token}` } }
                )
                .then((res) => {
                  alert(
                    "상품 구매가 완료되었습니다. 상품이 발송되기까지 시간이 걸릴 수 있습니다."
                  );
                  router.push("/store");
                })
                .catch((err) => console.log(err));
            }}
          />
        </>
      )}
    </>
  );
}
