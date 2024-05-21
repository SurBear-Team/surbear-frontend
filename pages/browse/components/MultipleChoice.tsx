import { SmallCheckIcon } from "@/pages/components/styles/Icons";
import { useEffect, useState } from "react";
import { IOption } from "../[id]";

interface IMultipleChoice {
  index: number;
  title: string;
  options: IOption[];
  required: boolean;
  onSelect: (selected: string[]) => void;
  initial: string[];
}

export default function MultipleChoice({
  index,
  title,
  options,
  required,
  onSelect,
  initial,
}: IMultipleChoice) {
  const [selected, setSelected] = useState<string[]>([]);
  useEffect(() => {
    setSelected(initial);
  }, [initial]);
  const onOptionClick = (target: string) => {
    if (selected.find((el) => el === target) === undefined) {
      const tempArr = [...selected, target];
      setSelected(tempArr);
      onSelect(tempArr);
    } else {
      const tempArr = [...selected];
      const targetIndex = tempArr.findIndex((el) => el === target);
      tempArr.splice(targetIndex, 1);
      setSelected(tempArr);
      onSelect(tempArr);
    }
  };

  return (
    <div className="w-full px-6 py-8 gap-6 flex flex-col">
      <span className="flex gap-1">
        {`${index}. ${title}`}
        {required && <span className="text-red-1">*</span>}
      </span>
      <div className="flex flex-col gap-4">
        {options.map((el, index) => (
          <div
            onClick={() => onOptionClick(el.answer)}
            key={index}
            className="flex gap-3 p-2 items-center border border-gray-4 rounded-lg cursor-pointer"
          >
            <div
              className={`w-4 h-4 border border-gray-7 rounded-[4px] flex-center shrink-0 ${
                selected.find((target) => target === el.answer) !== undefined &&
                "border-none bg-primary-1"
              }`}
            >
              {selected.find((target) => target === el.answer) !==
                undefined && <SmallCheckIcon />}
            </div>
            <span className="flex-grow">{el.answer}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
