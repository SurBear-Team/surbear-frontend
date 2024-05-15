import { useEffect, useState } from "react";

interface IShortAnswer {
  index: number;
  title: string;
  required: boolean;
  onSelect: (selected: string) => void;
  initial: string[];
  maxText: number;
}

export default function ShortAnswer({
  index,
  title,
  required,
  onSelect,
  initial,
  maxText,
}: IShortAnswer) {
  const [answer, setAnswer] = useState("");
  useEffect(() => {
    setAnswer(initial[0]);
  }, [initial]);
  return (
    <div className="w-full px-6 py-8 gap-6 flex flex-col">
      <span className="flex gap-1">
        {`${index}. ${title}`}
        {required && <span className="text-red-1">*</span>}
      </span>
      <input
        maxLength={maxText}
        type="text"
        className="main-input text-gray-9 font-normal"
        value={answer}
        onChange={(event) => {
          const value = event.target.value;
          setAnswer(value);
          onSelect(value);
        }}
      />
    </div>
  );
}
