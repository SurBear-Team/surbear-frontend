import { useRouter } from "next/router";
import { AddSurveyIcon, SearchIcon, SettingIcon } from "../../styles/Icons";

function SearchBox() {
  return (
    <form className="relative">
      <input
        className="w-40 border border-gray-4 px-2 py-1"
        type="text"
      ></input>
      <SearchIcon />
    </form>
  );
}

interface IProgressBar {
  progress: number;
}

function ProgressBar({ progress }: IProgressBar) {
  return (
    <div className="flex items-center gap-1 font-semibold text-[10px] text-gray-9">
      <span>진행도</span>
      <div className="w-16 h-2 bg-gray-3 rounded-full relative">
        <div
          style={{ width: `${progress}%` }}
          className="h-full rounded-full bg-primary-1 absolute top-0 left-0"
        />
      </div>
      <span>{progress}%</span>
    </div>
  );
}

function SettingButton() {
  const router = useRouter();
  const onSettingClick = () => {
    router.push("/profile/setting");
  };
  return (
    <div onClick={onSettingClick}>
      <SettingIcon />
    </div>
  );
}

interface IPlusButton {
  onClick: () => void;
}

function PlusButton({ onClick }: IPlusButton) {
  return (
    <div
      onClick={onClick}
      className="flex items-center text-gray-9 text-xs gap-1 font-semibold cursor-pointer"
    >
      <AddSurveyIcon />
      <div>새 설문 만들기</div>
    </div>
  );
}

interface IRightButton {
  hasSearch?: boolean;
  progress?: number;
  hasSetting?: boolean;
  newSurvey?: () => void;
}

export default function RightButton({
  hasSearch,
  progress,
  hasSetting,
  newSurvey,
}: IRightButton) {
  return (
    <>
      {hasSearch && <SearchBox />}
      {progress !== undefined && <ProgressBar progress={progress} />}
      {newSurvey && <PlusButton onClick={newSurvey} />}
      {hasSetting && <SettingButton />}
    </>
  );
}
