import { useEffect, useState } from "react";
import { IOption } from "../Survey";

interface ISingleChoice {
  index: number;
  title: string;
  options: IOption[];
  required: boolean;
  onSelect: (selected: string) => void;
  initial: string[];
}

export default function SingleChoice({
  index,
  title,
  options,
  required,
  onSelect,
  initial,
}: ISingleChoice) {
  const [selected, setSelected] = useState(-1);
  useEffect(() => {
    const index = options.findIndex((el) => el.answer === initial[0]);
    setSelected(index);
  }, [initial]);
  const onOptionClick = (index: number) => {
    setSelected(index);
    onSelect(options[index].answer);
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
            onClick={() => onOptionClick(index)}
            key={index}
            className="flex gap-3 p-2 items-center border border-gray-4 rounded-lg cursor-pointer"
          >
            <div className="w-4 h-4 border border-gray-7 rounded-full flex-center shrink-0">
              {selected === index && (
                <div className="w-2 h-2 bg-primary-1 rounded-full" />
              )}
            </div>
            <span className="flex-grow">{el.answer}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
