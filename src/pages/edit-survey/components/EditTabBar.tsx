import {
  AddQuestionIcon,
  NextPageIcon,
  PrevPageIcon,
  SaveIcon,
} from "@/components/styles/Icons";
import { TabButton } from "@/pages/my-survey/new-survey/components/SurveyTabBar";

interface EditTabBarprops {
  setIsNewSurvey: (value: (prevState: boolean) => boolean) => void;
  goToPrevPage: () => void;
  goToNextPage: () => void;
  saveSurvey: () => void;
}

export const EditTabBar = ({
  setIsNewSurvey,
  goToPrevPage,
  goToNextPage,
  saveSurvey,
}: EditTabBarprops) => {
  return (
    <div className="w-full flex justify-center gap-4 left-0 right-0 mx-auto px-1 bg-white fixed bottom-0">
      <div className="flex w-full max-w-xl justify-between">
        <TabButton
          onClick={() => {
            setIsNewSurvey((prev) => !prev);
          }}
          icon={<AddQuestionIcon />}
          label="새 질문"
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
