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
    <div className="w-full flex justify-center left-0 right-0 mx-auto px-3 items-start bg-white fixed bottom-0">
      <div className="flex w-full max-w-xl justify-between">
        <TabBox
          onClick={() => {
            router.push("/browse");
          }}
          Icon={<BrowseIcon active={isActive("/browse")} />}
          text="둘러보기"
          isActive={isActive("/browse")}
        />

        <TabBox
          onClick={() => {
            router.push("/my-survey");
          }}
          Icon={<MySurveyIcon active={isActive("/my-survey")} />}
          text="내 설문"
          isActive={isActive("/my-survey")}
        />

        <TabBox
          onClick={() => {
            router.push("/point");
          }}
          Icon={<PointIcon active={isActive("/point")} />}
          text="포인트 교환"
          isActive={isActive("/point")}
        />

        <TabBox
          onClick={() => {
            router.push("/profile");
          }}
          Icon={<ProfileIcon active={isActive("/profile")} />}
          text="프로필"
          isActive={isActive("/profile")}
        />
      </div>
    </div>
  );
};

const TabBox = ({ onClick, Icon, text, isActive }: any) => {
  return (
    <div
      className="flex flex-col w-full items-center px-[23px] py-[15px] gap-1 cursor-pointer"
      onClick={onClick}
    >
      <div>{Icon}</div>
      <div
        className={`text-[10px] whitespace-nowrap ${
          isActive && "font-bold text-primary-1"
        }`}
      >
        {text}
      </div>
    </div>
  );
};
