interface DialogProps {
  title: string;
  leftText: string;
  onLeftClick: () => void;
  rightText: string;
  onRightClick: () => void;
  isDelete?: boolean;
}

export const Dialog = ({
  title,
  leftText,
  onLeftClick,
  rightText,
  onRightClick,
  isDelete,
}: DialogProps) => {
  return (
    <div className="inline-flex px-8 py-6 flex-col items-start gap-6 rounded-lg bg-white">
      <div className="text-gray-9 text-center font-semibold w-full">
        {title}
      </div>
      <div className="flex justify-center items-center gap-4 w-full">
        <button
          onClick={onLeftClick}
          className="medium-Btn border-gray-5 bg-white"
        >
          {leftText}
        </button>
        <button
          onClick={onRightClick}
          className={`medium-Btn text-white ${
            isDelete ? "border-red-1 bg-red-1" : "border-primary-1 bg-primary-1"
          }`}
        >
          {rightText}
        </button>
      </div>
    </div>
  );
};