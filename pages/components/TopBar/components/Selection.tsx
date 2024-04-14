import { useState } from "react";
import { ArrowDownIcon } from "../../styles/Icons";

interface ISelection {
  type?: string;
  list?: string[];
  onSelect?: (selected: string) => void;
}

export default function Selection({ type, list, onSelect }: ISelection) {
  const [showList, setShowList] = useState(false);
  const onSelectionClick = () => setShowList((prev) => !prev);
  return (
    <div
      onClick={onSelectionClick}
      className="flex justify-center items-center cursor-pointer w-28 h-full grow px-2 relative"
    >
      <ArrowDownIcon />
      <div className="w-full whitespace-nowrap flex justify-center">{type}</div>
      {showList && (
        <div className="w-28 bg-white top-full absolute border border-t-0 border-gray-3 rounded-b-lg text-gray-9 text-xs text-center font-semibold shadow-md">
          {list?.map((data) => (
            <div
              key={data}
              className="px-4 py-2 cursor-pointer border-t-[1px] border-gray-3 "
              onClick={() => onSelect && onSelect(data)}
            >
              {data}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
