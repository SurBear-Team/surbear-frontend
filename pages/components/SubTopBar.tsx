import { ArrowDownIcon, FilterIcon } from "./styles/Icons";

export const SubTopBar = ({
  subTitle,
  hasFilter,
  onFilterClick,
  hasOrder,
  onOrderClick,
  orderType,
}: any) => {
  return (
    <div className="px-6 py-3 shadow-xl">
      <div
        className={`flex text-center font-semibold ${
          subTitle ? "justify-between" : "justify-end"
        }`}
      >
        {subTitle}
        <div className="flex gap-4">
          {hasFilter && (
            <div
              onClick={onFilterClick}
              className="flex items-center gap-1 cursor-pointer"
            >
              <FilterIcon />
              <div>필터</div>
            </div>
          )}
          {hasOrder && (
            <div
              onClick={onOrderClick}
              className="flex items-center gap-1 cursor-pointer"
            >
              <ArrowDownIcon />
              <div>{orderType}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
