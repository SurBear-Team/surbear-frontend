import { useState } from "react";
import { ArrowDownIcon } from "../styles/Icons";
import Selection from "./components/Selection";

interface SubTopBarProps {
  subTitle?: string;

  categoryList?: string[];
  categoryType?: string;
  onCategorySelect?: (selectedCategory: string) => void;

  orderList?: string[];
  orderType?: string;
  onOrderSelect?: (selectedOrder: string) => void;
}

export const SubTopBar = ({
  subTitle,
  categoryList,
  categoryType,
  onCategorySelect,
  orderList,
  orderType,
  onOrderSelect,
}: SubTopBarProps) => {
  return (
    <>
      <div className="w-full max-w-xl pl-6 h-8 text-xs">
        <div className="flex font-semibold relative h-full items-center justify-between">
          {subTitle}
          <div className="flex h-full">
            {categoryList && (
              <Selection
                type={categoryType}
                list={categoryList}
                onSelect={(selected: string) =>
                  onCategorySelect && onCategorySelect(selected)
                }
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
