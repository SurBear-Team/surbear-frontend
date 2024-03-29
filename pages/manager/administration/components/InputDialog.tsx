interface DialogProps {
  title: string;
  placeholder: string;
  leftText: string;
  onLeftClick: () => void;
  rightText: string;
  onRightClick: () => void;
}

export const InputDialog = ({
  title,
  placeholder,
  leftText,
  onLeftClick,
  rightText,
  onRightClick,
}: DialogProps) => {
  return (
    <div className="inline-flex flex-col py-8 px-6 rounded-lg max-w-xl z-20 bg-white shadow-md">
      <div className="text-gray-9 font-semibold">{title}</div>
      <input placeholder={placeholder} className="main-input" />
      <div className="gray-line my-6" />
      <div className="flex justify-between w-full gap-4">
        <button
          onClick={onLeftClick}
          className="small-Btn border-gray-5 text-gray-5"
        >
          {leftText}
        </button>
        <button onClick={onRightClick} className="small-Btn primary-btn-style">
          {rightText}
        </button>
      </div>
    </div>
  );
};
