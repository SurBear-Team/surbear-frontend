import { useRouter } from "next/router";
import { ArrowBackIcon } from "../../styles/Icons";

interface IBackButton {
  hasBack?: boolean;
  title: string;
}

export default function LeftButton({ hasBack, title }: IBackButton) {
  const router = useRouter();
  const onBackClick = () => {
    router.back();
  };
  return (
    <>
      {hasBack ? (
        <div
          onClick={onBackClick}
          className="flex gap-2 items-center cursor-pointer"
        >
          <ArrowBackIcon />
          <span className="font-semibold text-gray-9 text-base">{title}</span>
        </div>
      ) : (
        <span className="text-base font-semibold">{title}</span>
      )}
    </>
  );
}
