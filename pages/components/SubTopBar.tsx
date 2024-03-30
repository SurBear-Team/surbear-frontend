import { ArrowDownIcon } from "./styles/Icons";

interface SubTopBarProps {
  subTitle?: string;

  hasCategory?: boolean;
  onCategoryClick?: () => void;
  showCategory?: boolean;
  categoryList?: string[];
  categoryType?: string;
  onCategorySelect?: (selectedCategory: string) => void;

  hasOrder?: boolean;
  onOrderClick?: () => void;
  showOrder?: boolean;
  orderList?: string[];
  orderType?: string;
  onOrderSelect?: (selectedOrder: string) => void;
}

export const SubTopBar = ({
  subTitle,
  hasCategory,
  onCategoryClick,
  showCategory,
  categoryList,
  categoryType,
  onCategorySelect,
  hasOrder,
  onOrderClick,
  showOrder,
  orderList,
  orderType,
  onOrderSelect,
}: SubTopBarProps) => {
  return (
    <>
      <div className="pl-[26px] py-1 shadow-xl text-xs">
        <div
          className={`flex text-center font-semibold relative ${
            subTitle ? "justify-between" : "justify-end"
          }`}
        >
          {subTitle}
          <div className="flex">
            {hasCategory && (
              <div
                onClick={onCategoryClick}
                className="flex justify-center items-center cursor-pointer w-28 grow px-2"
              >
                <ArrowDownIcon />
                <div className="w-full whitespace-nowrap">{categoryType}</div>
              </div>
            )}

            {hasOrder && (
              <div
                onClick={onOrderClick}
                className="flex justify-center items-center cursor-pointer w-28 grow px-2"
              >
                <ArrowDownIcon />
                <div className="w-full whitespace-nowrap">{orderType}</div>
              </div>
            )}
          </div>
        </div>
      </div>
      {showCategory && (
        <div className="w-28 bg-white right-28 absolute border-[1px] border-gray-3 rounded-b-lg text-gray-9 text-xs text-center font-semibold shadow-md">
          {categoryList?.map((data) => (
            <div
              key={data}
              className="px-4 py-2 cursor-pointer border-t-[1px] border-gray-3 "
              onClick={() => onCategorySelect && onCategorySelect(data)}
            >
              {data}
            </div>
          ))}
        </div>
      )}

      {showOrder && (
        <div className="w-28 bg-white right-0 absolute border-[1px] border-gray-3 rounded-b-lg text-gray-9 text-xs text-center font-semibold shadow-md">
          {orderList?.map((data) => (
            <div
              key={data}
              className="px-4 py-2 cursor-pointer border-t-[1px] border-gray-3 "
              onClick={() => onOrderSelect && onOrderSelect(data)}
            >
              {data}
            </div>
          ))}
        </div>
      )}
    </>
  );
};
