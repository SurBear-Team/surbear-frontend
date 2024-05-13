import { useRouter } from "next/router";
import { ArrowBackIcon } from "../../styles/Icons";

interface IBackButton {
  hasBack?: boolean;
  title: string;
  onClick?: () => void;
}

export default function LeftButton({ hasBack, title, onClick }: IBackButton) {
  const router = useRouter();
  const onBackClick = () => {
    router.back();
  };
  return (
    <>
      {hasBack ? (
        <div className="flex gap-2 items-center w-full">
          <div
            className="cursor-pointer"
            onClick={onClick ? onClick : onBackClick}
          >
            <ArrowBackIcon />
          </div>
          <span className="font-semibold text-gray-9 text-base whitespace-nowrap overflow-hidden text-ellipsis">
            {title}
          </span>
        </div>
      ) : (
        <span className="text-base font-semibold whitespace-nowrap">
          {title}
        </span>
      )}
    </>
  );
}
