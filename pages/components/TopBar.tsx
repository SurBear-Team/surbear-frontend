import { SubTopBar } from "./SubTopBar";

interface TopBarProps {
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  leftSVG?: React.ReactNode;
  onRightClick?: React.MouseEventHandler<HTMLDivElement>;
  rightSVG?: React.ReactNode;
  title?: string;
  hasSubTopBar?: boolean;
  subTitle?: string;
  hasFilter?: boolean;
  onFilterClick?: () => void;
  hasOrder?: boolean;
  onOrderClick?: () => void;
  orderType?: string;
}

export const TopBar: React.FC<TopBarProps> = ({
  onClick,
  leftSVG,
  onRightClick,
  rightSVG,
  title,
  hasSubTopBar,
  subTitle,
  hasFilter,
  onFilterClick,
  hasOrder,
  onOrderClick,
  orderType,
}) => {
  return (
    <div
      className={`bg-white left-0 right-0 mx-auto fixed w-full max-w-[36rem] justify-center `}
    >
      <div className="flex px-6 py-3 justify-between">
        <div className="flex gap-2 items-center">
          <div onClick={onClick}>{leftSVG}</div>
          <span className="text-base font-semibold mt-[2px]">{title}</span>
        </div>
        <div onClick={onRightClick}>{rightSVG}</div>
      </div>
      {hasSubTopBar && (
        <SubTopBar
          subTitle={subTitle}
          hasFilter={hasFilter}
          onFilterClick={onFilterClick}
          hasOrder={hasOrder}
          onOrderClick={onOrderClick}
          orderType={orderType}
        />
      )}
    </div>
  );
};
