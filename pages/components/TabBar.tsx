import { useRouter } from "next/router";
import {
  BrowseIcon,
  MySurveyIcon,
  PointIcon,
  ProfileIcon,
} from "./styles/Icons";

export const TabBar = () => {
  const router = useRouter();
  const isActive = (path: string) => router.pathname === path;
  return (
    <div className="flex w-full left-0 right-0 mx-auto max-w-[36rem] px-3 justify-evenly items-start gap-4 bg-white fixed bottom-0">
      <TabBox
        onClick={() => {
          router.push("/browse");
        }}
        Icon={<BrowseIcon active={isActive("/browse")} />}
        text="둘러보기"
      />

      <TabBox
        onClick={() => {
          router.push("/my-survey");
        }}
        Icon={<MySurveyIcon active={isActive("/my-survey")} />}
        text="내 설문"
      />

      <TabBox
        onClick={() => {
          router.push("/point");
        }}
        Icon={<PointIcon active={isActive("/point")} />}
        text="포인트 교환"
      />

      <TabBox
        onClick={() => {
          router.push("/profile");
        }}
        Icon={<ProfileIcon active={isActive("/profile")} />}
        text="프로필"
      />
    </div>
  );
};

const TabBox = ({ onClick, Icon, text }: any) => {
  return (
    <div
      className="flex flex-col w-full items-center px-[23px] py-[15px] gap-1 cursor-pointer"
      onClick={onClick}
    >
      <div>{Icon}</div>
      <div className="text-[10px]  whitespace-nowrap">{text}</div>
    </div>
  );
};
