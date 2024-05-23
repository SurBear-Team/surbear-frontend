import {
  AddPageIcon,
  AddQuestionIcon,
  NextPageIcon,
  PrevPageIcon,
  SaveIcon,
} from "@/components/styles/Icons";

interface SurveyTabBarProps {
  setIsNewSurvey: (value: (prevState: boolean) => boolean) => void;
  addNewPage: () => void;
  goToPrevPage: () => void;
  goToNextPage: () => void;
  saveSurvey: () => void;
  canAddPage: boolean;
  setSelectedQuestion: (value: string | null) => void;
}

export const SurveyTabBar = ({
  setIsNewSurvey,
  addNewPage,
  goToPrevPage,
  goToNextPage,
  saveSurvey,
  canAddPage,
  setSelectedQuestion,
}: SurveyTabBarProps) => {
  return (
    <div className="w-full flex justify-center gap-4 left-0 right-0 mx-auto px-1 bg-white fixed bottom-0">
      <div className="flex w-full max-w-xl justify-between">
        <TabButton
          onClick={() => {
            setIsNewSurvey((prev) => !prev);
            setSelectedQuestion(null);
          }}
          icon={<AddQuestionIcon />}
          label="새 질문"
        />
        <TabButton
          onClick={addNewPage}
          disabled={!canAddPage}
          icon={<AddPageIcon />}
          label="새 페이지"
        />
        <TabButton
          onClick={goToPrevPage}
          icon={<PrevPageIcon />}
          label="이전 페이지"
        />
        <TabButton
          onClick={goToNextPage}
          icon={<NextPageIcon />}
          label="다음 페이지"
        />
        <TabButton
          onClick={saveSurvey}
          icon={<SaveIcon />}
          label="설문조사 저장"
          labelStyle="text-primary-1"
        />
      </div>
    </div>
  );
};

interface TabButtonProps {
  onClick: () => void;
  icon: JSX.Element;
  label: string;
  disabled?: boolean;
  labelStyle?: string;
}

export const TabButton = ({
  onClick,
  icon,
  label,
  disabled,
  labelStyle,
}: TabButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 flex-col gap-1 flex-center ${
        disabled ? "opacity-50" : "cursor-pointer"
      }`}
    >
      {icon}
      <div className={`text-[10px] font-semibold ${labelStyle}`}>{label}</div>
    </button>
  );
};
