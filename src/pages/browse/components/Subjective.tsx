import { useEffect, useState } from "react";

interface ISubjective {
  index: number;
  title: string;
  required: boolean;
  onSelect: (value: string) => void;
  initial: string[];
  maxText: number;
}

export default function Subjective({
  index,
  title,
  required,
  onSelect,
  initial,
  maxText,
}: ISubjective) {
  const [answer, setAnswer] = useState("");
  useEffect(() => {
    setAnswer(initial[0] ? initial[0] : "");
  }, [initial]);
  return (
    <>
      <div className="w-full px-6 py-8 gap-6 flex flex-col">
        <span className="flex gap-1">
          {`${index}. ${title}`}
          {required && <span className="text-red-1">*</span>}
        </span>
        <textarea
          className="main-input text-gray-9 font-normal"
          rows={4}
          cols={50}
          value={answer}
          onChange={(event) => {
            const value = event.target.value;
            setAnswer(value);
            onSelect(value);
          }}
          maxLength={maxText}
        />
      </div>
    </>
  );
}
