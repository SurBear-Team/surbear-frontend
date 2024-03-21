interface CheckBoxProps {
  inputChecked: boolean;
  onClick: () => void;
  label: string;
  isAll?: boolean;
  showSheet?: any;
}

export const Checkbox = ({
  inputChecked,
  onClick,
  label,
  isAll,
  showSheet,
}: CheckBoxProps) => (
  <div
    className="flex justify-between items-center gap-4 py-[22px]"
    onClick={onClick}
  >
    <div className="flex gap-4 items-center">
      <div
        className={`check-box ${
          inputChecked ? "bg-[#6E7CF2]" : "bg-white border border-gray-7"
        }`}
      >
        {inputChecked && (
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.97 4.97C11.1108 4.83589 11.2983 4.76175 11.4928 4.76322C11.6873 4.76469 11.8736 4.84166 12.0124 4.97789C12.1512 5.11412 12.2317 5.29895 12.2369 5.49338C12.242 5.68781 12.1714 5.87663 12.04 6.02L8.04997 11.01C7.98137 11.0839 7.89856 11.1432 7.80651 11.1844C7.71445 11.2255 7.61505 11.2477 7.51423 11.2496C7.41341 11.2514 7.31324 11.233 7.21973 11.1952C7.12622 11.1575 7.04127 11.1013 6.96997 11.03L4.32397 8.384C4.25029 8.31534 4.19119 8.23254 4.15019 8.14054C4.1092 8.04854 4.08716 7.94923 4.08538 7.84852C4.08361 7.74782 4.10213 7.64779 4.13985 7.5544C4.17757 7.46102 4.23372 7.37618 4.30494 7.30496C4.37616 7.23374 4.46099 7.1776 4.55438 7.13988C4.64777 7.10216 4.74779 7.08363 4.8485 7.08541C4.9492 7.08719 5.04851 7.10923 5.14051 7.15022C5.23251 7.19121 5.31531 7.25031 5.38397 7.324L7.47797 9.417L10.951 4.992L10.97 4.97Z"
              fill="white"
            />
          </svg>
        )}
      </div>
      <div className="text-sm font-normal mt-[2px]">{label}</div>
    </div>
    {/* 보기 버튼 */}
    {!isAll && (
      <button
        onClick={showSheet}
        className="flex text-xs border border-[#6E7CF2] text-[#6E7CF2] px-2 py-1 font-bold ml-[14px] rounded-2xl"
      >
        보기
      </button>
    )}
  </div>
);
