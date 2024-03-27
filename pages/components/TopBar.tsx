import { SubTopBar } from "./SubTopBar";

interface TopBarProps {
  onLeftClick?: React.MouseEventHandler<HTMLDivElement>;
  leftSVG?: React.ReactNode;
  onRightClick?: React.MouseEventHandler<HTMLDivElement>;
  rightSVG?: React.ReactNode;
  title?: string;
  hasShadow?: boolean; // 탑바에 그림자 없을 때
  hasSubTopBar?: boolean; // 서브 탑바가 있나요?
  subTitle?: string; // 서브 탑바 제목
  hasOrder?: boolean; // 정렬이 있나요?
  onOrderClick?: () => void; // 정렬 클릭
  showOrder?: boolean; // 정렬 보여주기
  orderList?: string[]; // 정렬 목록
  orderType?: string; // 현재 정렬이 뭐로 됐는지
  onOrderSelect?: (selectedOrder: string) => void; // 선택한 정렬
}

export const TopBar: React.FC<TopBarProps> = ({
  onLeftClick,
  leftSVG,
  onRightClick,
  rightSVG,
  title,
  hasShadow,
  hasSubTopBar,
  subTitle,
  hasOrder,
  onOrderClick,
  showOrder,
  orderList,
  orderType,
  onOrderSelect,
}) => {
  return (
    <div
      className={`bg-white left-0 right-0 mx-auto fixed w-full max-w-[36rem] justify-center ${
        hasShadow && "shadow-md"
      }`}
    >
      <div className="flex px-6 py-3 justify-between">
        <div className={`flex ${leftSVG && "gap-2"} items-center`}>
          <div onClick={onLeftClick}>{leftSVG}</div>
          <span className="text-base font-semibold mt-[2px]">{title}</span>
        </div>
        <div onClick={onRightClick} className="flex items-center">
          {rightSVG}
        </div>
      </div>
      {hasSubTopBar && (
        <SubTopBar
          subTitle={subTitle}
          hasOrder={hasOrder}
          onOrderClick={onOrderClick}
          showOrder={showOrder}
          orderList={orderList || []}
          orderType={orderType}
          onOrderSelect={onOrderSelect}
        />
      )}
    </div>
  );
};
