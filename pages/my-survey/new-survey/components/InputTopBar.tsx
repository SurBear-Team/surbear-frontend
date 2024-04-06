import {
  ArrowBackIcon,
  CheckIcon,
  UpdateIcon,
} from "../../../components/styles/Icons";
import { useEffect, useRef, useState } from "react";

export const InputTopBar = ({ title, setTitle, onBackClick }: any) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [inUpdate, setInUpdate] = useState(false);
  useEffect(() => {
    if (inUpdate) {
      inputRef.current?.focus(); // 체크 아이콘 누르면 input에 focus
    }
  }, [inUpdate]);

  const onFocusOut = () => {
    setInUpdate(false); // 다른데 누르면 제목 변경 끝
  };

  const onTitleChange = (e: any) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
  };

  const toggleUpdate = () => {
    setInUpdate((prev) => !prev);
  };
  return (
    <div className="bg-white fixed w-full shadow-md flex px-6 py-3 justify-between gap-2">
      <div onClick={onBackClick}>
        <ArrowBackIcon />
      </div>

      <input
        ref={inputRef}
        value={title}
        disabled={!inUpdate}
        onChange={onTitleChange}
        onBlur={onFocusOut}
        className={`w-full sm-gray-9-text text-base bg-white`}
      />

      <div onClick={toggleUpdate}>
        {inUpdate ? <CheckIcon /> : <UpdateIcon />}
      </div>
    </div>
  );
};
