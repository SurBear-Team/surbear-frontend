import { SubTopBar } from "./SubTopBar";
import LeftButton from "./components/LeftButton";
import RightButton from "./components/RightButton";

interface TopBarProps {
  title: string;
  hasBack?: boolean; // 뒤로가기 버튼이 있나요?

  hasSearch?: boolean; // 검색창이 있나요?
  progress?: number; // 설문 진행도
  hasSetting?: boolean; // 설정 버튼이 있나요?
  newSurvey?: () => void; // 새 설문 만들기 로직

  subTitle?: string; // 서브 탑바 제목

  categoryList?: string[]; // 카테고리 목록
  categoryType?: string; // 현재 카테고리가 뭐로 됐는지
  onCategorySelect?: (selectedCategory: string) => void; // 선택한 카테고리

  orderList?: string[]; // 정렬 목록
  orderType?: string; // 현재 정렬이 뭐로 됐는지
  onOrderSelect?: (selectedOrder: string) => void; // 선택한 정렬
}

export const TopBar: React.FC<TopBarProps> = ({
  title,
  hasBack,
  hasSearch,
  progress,
  hasSetting,
  newSurvey,
  subTitle,
  categoryList,
  categoryType,
  onCategorySelect,
  orderList,
  orderType,
  onOrderSelect,
}) => {
  return (
    <div
      className={`bg-white fixed flex-col w-full z-10 shadow-md flex items-center`}
    >
      <div className="w-full h-12 max-w-xl pl-6 pr-4 flex justify-between items-center">
        <LeftButton hasBack={hasBack} title={title!} />
        <RightButton
          hasSearch={hasSearch}
          progress={progress}
          hasSetting={hasSetting}
          newSurvey={newSurvey}
        />
      </div>
      {subTitle && (
        <SubTopBar
          subTitle={subTitle}
          categoryList={categoryList}
          categoryType={categoryType}
          onCategorySelect={(selected: string) =>
            onCategorySelect && onCategorySelect(selected)
          }
          orderList={orderList}
          orderType={orderType}
          onOrderSelect={(selected: string) =>
            onOrderSelect && onOrderSelect(selected)
          }
        />
      )}
    </div>
  );
};
