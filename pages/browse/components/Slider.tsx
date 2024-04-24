import { useEffect, useRef, useState } from "react";
import { PanInfo, motion } from "framer-motion";

interface ISlider {
  index: number;
  title: string;
  onChange: (ratio: number) => void;
  initial: number[];
}

export default function Slider({ index, title, onChange, initial }: ISlider) {
  const [ratio, setRatio] = useState(0);
  const [x, setX] = useState(0);
  useEffect(() => {
    const offset = constraintRef.current?.offsetLeft!;
    const width = constraintRef.current?.clientWidth!;
    setOffset(offset);
    setWidth(width);
    setRatio(initial[0]);
    const x = (width - 24) * (initial[0] / 100);
    setX(x);
  }, [initial]);
  const constraintRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);
  const [width, setWidth] = useState(0);

  const calcRatio = (offset: number, x: number, boxWidth: number) => {
    const result = Math.floor(((x - offset) / boxWidth) * 100);
    if (result < 0) return 0;
    else if (result > 100) return 100;
    else return result;
  };

  const onDrag = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    // 화면 크기가 달라지는 것을 반영
    const offset = constraintRef.current?.offsetLeft!;
    const width = constraintRef.current?.clientWidth!;
    setOffset(offset);
    setWidth(width);

    const ratio = calcRatio(offset, info.point.x, width);
    setRatio(ratio);
    onChange(ratio);
  };

  return (
    <div className="w-full px-6 py-8 gap-6 flex flex-col">
      <span>{`${index}. ${title}`}</span>
      <div className="flex items-center gap-3">
        <div className="w-full bg-[#C0C5F5] rounded-full flex justify-center items-center p-6 shadow-md flex-grow">
          <motion.div
            ref={constraintRef}
            className="w-full h-3 bg-white rounded-full shadow-md"
          >
            <div className="relative w-full h-full flex items-center">
              <div
                // input에 ratio 값을 작게 적었을 때 간격이 생기는 것 방지
                style={{ width: `${ratio < 70 ? ratio + 2 : ratio}%` }}
                className="absolute w-full h-full rounded-full bg-primary-1"
              />
              <motion.div
                animate={{ x: x }}
                drag="x"
                transition={{ duration: 0 }}
                dragConstraints={constraintRef}
                dragElastic={0}
                dragMomentum={false}
                onDrag={(event, info) => {
                  onDrag(event, info);
                }}
                className="relative w-6 h-6 rounded-full bg-white shadow-md"
              ></motion.div>
            </div>
          </motion.div>
        </div>
        <div className="w-[2px] h-4/5 bg-gray-4" />
        <input
          value={ratio}
          className="border border-gray-4 w-12 h-10 text-center text-gray-9"
          type="number"
          onChange={(event) => {
            // 화면 크기가 달라지는 것을 반영
            const offset = constraintRef.current?.offsetLeft!;
            const width = constraintRef.current?.clientWidth!;
            setOffset(offset);
            setWidth(width);

            const ratio = () => {
              const value = +event.target.value;
              if (value < 0) return 0;
              else if (value > 100) return 100;
              else return value;
            };
            setRatio(ratio());
            onChange(ratio());
            const x = (width - 24) * (ratio() / 100);
            setX(x);
          }}
        />
      </div>
    </div>
  );
}
