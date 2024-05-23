import { Slider } from "@mui/material";
import React, { useState } from "react";

interface IRangeSlider {
  index: number;
  title: string;
  onChange: (ratio: number) => void;
  initial: number[];
}

export default function RangeSlider({
  index,
  title,
  onChange,
  initial,
}: IRangeSlider) {
  const [value, setValue] = useState(initial[0] ? initial[0] : 0);
  const [inputValue, setInputValue] = useState(initial[0] ? initial[0] : 0);
  return (
    <div className="w-full px-6 py-8 gap-6 flex flex-col">
      <span>{`${index}. ${title}`}</span>
      <div className="flex items-center gap-3">
        <Slider
          defaultValue={value}
          value={value}
          onChange={(event, newValue: number | number[]) => {
            setValue(newValue as number);
            setInputValue(newValue as number);
            onChange(newValue as number);
          }}
          valueLabelDisplay="auto"
          step={10}
          min={0}
          max={100}
          marks
          sx={{
            color: "#6E7CF2",
            height: 10,
            "& .MuiSlider-valueLabel": {
              lineHeight: 1.2,
              fontSize: 12,
              background: "unset",
              padding: 0,
              width: 32,
              height: 32,
              borderRadius: "50% 50% 50% 0",
              backgroundColor: "#ffffff",
              transformOrigin: "bottom left",
              transform: "translate(50%, -100%) rotate(-45deg) scale(0)",
              "&::before": { display: "none" },
              "&.MuiSlider-valueLabelOpen": {
                transform: "translate(50%, -100%) rotate(-45deg) scale(1)",
              },
              "& > *": {
                transform: "rotate(45deg)",
                color: "#6E7CF2",
              },
              border: 1,
              borderColor: "#6E7CF2",
            },
          }}
        />
        <div className="w-[2px] h-6 bg-gray-4" />
        <input
          value={inputValue}
          className="border border-gray-4 w-12 h-8 text-center text-gray-9 text-sm"
          type="text"
          onChange={(event) => {
            const newValue = +event.target.value;
            if (!isNaN(newValue)) {
              if (newValue >= 100) {
                setInputValue(100);
              } else {
                setInputValue(newValue);
              }
            }
          }}
          onBlur={(event) => {
            const result = Math.round(+event.target.value / 10) * 10;
            setInputValue(result);
            setValue(result);
          }}
          onKeyUp={(event: React.KeyboardEvent<HTMLInputElement>) => {
            if (event.code === "Enter") {
              const result = Math.round(+event.currentTarget.value / 10) * 10;
              setInputValue(result);
              setValue(result);
            }
          }}
        />
      </div>
    </div>
  );
}
