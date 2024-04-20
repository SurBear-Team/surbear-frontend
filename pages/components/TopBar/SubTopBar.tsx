import Selection from "./components/Selection";
import { useRecoilState } from "recoil";
import { categoryTypeAtom } from "@/pages/atoms";
import { category } from "@/pages/browse/data";
import { useEffect, useState } from "react";

interface SubTopBarProps {
  subTitle?: string;

  orderList?: string[];
  orderType?: string;
  onOrderSelect?: (selectedOrder: string) => void;
}

export const SubTopBar = ({
  subTitle,
  orderList,
  orderType,
  onOrderSelect,
}: SubTopBarProps) => {
  const categoryList = category.map((el) => el.value);
  const [categoryType, setCategoryType] = useRecoilState(categoryTypeAtom);
  const [categoryValue, setCategoryValue] = useState("");
  const filteredCategory = category.filter((el) => el.key === categoryType);
  useEffect(() => {
    filteredCategory.length === 1 &&
      setCategoryValue(filteredCategory[0].value);
  }, [categoryList, categoryType]);

  return (
    <>
      <div className="w-full max-w-xl pl-6 h-8 text-xs">
        <div className="flex font-semibold relative h-full items-center justify-between">
          {subTitle}
          <div className="flex h-full">
            {categoryList && (
              <Selection
                type={categoryValue}
                list={categoryList}
                onSelect={(selected: string) => {
                  const [{ key, value }] = category.filter(
                    (el) => el.value === selected
                  );
                  setCategoryType(key);
                }}
              />
            )}
            {orderList && (
              <Selection
                type={orderType}
                list={orderList}
                onSelect={(selected: string) =>
                  onOrderSelect && onOrderSelect(selected)
                }
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};
