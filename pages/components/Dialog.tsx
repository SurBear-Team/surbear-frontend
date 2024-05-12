import { useState } from "react";
import { Overlay } from "./styles/Overlay";

interface DialogProps {
  title: string | React.ReactNode;
  content?: string;
  hasTextarea?: boolean;
  inputTitle?: string;
  onlyOneBtn?: boolean;
  leftText?: string;
  onLeftClick?: () => void;
  rightText: string;
  onRightClick: (text?: any) => void;
  isDelete?: boolean;
}

export const Dialog = ({
  title,
  content,
  hasTextarea,
  inputTitle,
  onlyOneBtn,
  leftText,
  onLeftClick,
  rightText,
  onRightClick,
  isDelete,
}: DialogProps) => {
  const [text, setText] = useState("");
  return (
    <>
      <Overlay onClick={onLeftClick!} />

      <div className="card justify-center fixed min-w-fit w-3/4 px-6 py-8 gap-8 bg-white z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="flex flex-col w-full justify-center items-center gap-4">
          <div className="text-gray-9 text-center font-semibold w-full">
            {title}
          </div>
          {/* 본문 */}
          {content && (
            <div className="text-gray-9 text-center font-medium w-full">
              {content}
            </div>
          )}
        </div>
        {/* 텍스트에리어 */}
        {hasTextarea && (
          <div className="w-full flex flex-col gap-2 -mt-4">
            <div className="w-full sm-gray-9-text font-medium">
              {inputTitle}
            </div>
            <textarea
              onChange={(event) => setText(event.target.value)}
              value={text}
              className="w-full p-2 items-start border-[1px] border-gray-4 sm-gray-9-text font-normal"
            />
          </div>
        )}

        {/* 하단버튼두개 */}
        <div className="flex justify-center items-center gap-4 w-full">
          {!onlyOneBtn && (
            <button
              onClick={onLeftClick}
              className="long-button border-gray-5 bg-white text-gray-5"
            >
              {leftText}
            </button>
          )}
          <button
            onClick={() => onRightClick(text)}
            className={`long-button text-white ${
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
