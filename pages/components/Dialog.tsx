import { Overlay } from "./styles/Overlay";

interface DialogProps {
  title: string;
  hasTextarea?: boolean;
  inputTitle?: string;
  leftText: string;
  onLeftClick: () => void;
  rightText: string;
  onRightClick: () => void;
  isDelete?: boolean;
}

export const Dialog = ({
  title,
  hasTextarea,
  inputTitle,
  leftText,
  onLeftClick,
  rightText,
  onRightClick,
  isDelete,
}: DialogProps) => {
  return (
    <>
      <Overlay />
      <div className="card justify-center fixed px-8 gap-8 bg-white z-20">
        <div className="text-gray-9 text-center font-semibold w-full">
          {title}
        </div>
        {/* 텍스트에리어 */}
        {hasTextarea && (
          <div className="w-full flex flex-col gap-2 -mt-4">
            <div className="w-full sm-gray-9-text font-medium">
              {inputTitle}
            </div>
            <textarea className="w-full p-2 items-start border-[1px] border-gray-4 sm-gray-9-text font-normal" />
          </div>
        )}

        {/* 하단버튼두개 */}
        <div className="flex justify-center items-center gap-4 w-full">
          <button
            onClick={onLeftClick}
            className="medium-Btn border-gray-5 bg-white text-gray-5"
          >
            {leftText}
          </button>
          <button
            onClick={onRightClick}
            className={`medium-Btn text-white ${
              isDelete
                ? "border-red-1 bg-red-1"
                : "border-primary-1 bg-primary-1"
            }`}
          >
            {rightText}
          </button>
        </div>
      </div>
    </>
  );
};
