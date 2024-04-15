import {
  ArrowBackIcon,
  CheckIcon,
  UpdateIcon,
} from "../../../components/styles/Icons";
import { useEffect, useRef, useState } from "react";

export const InputTopBar = ({ title, setTitle, onBackClick }: any) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [localTitle, setLocalTitle] = useState(title); // 로컬 상태를 사용하여 입력 관리

  const [inUpdate, setInUpdate] = useState(false);

  useEffect(() => {
    setLocalTitle(title); // 부모 컴포넌트로부터 받은 title로 로컬 상태 초기화
  }, [title]);

  useEffect(() => {
    if (inUpdate) {
      inputRef.current?.focus(); // 수정 모드 진입 시, 입력 필드에 포커스
    }
  }, [inUpdate]);

  const onFocusOut = () => {
    if (localTitle.trim() === "") {
      setLocalTitle(title); // 입력된 제목이 공백만 있으면 이전 제목으로 되돌림
    } else {
      setTitle(localTitle.trim()); // 공백이 아니면 상태 업데이트
    }
    setInUpdate(false); // 입력 모드 종료
  };

  const onTitleChange = (e: any) => {
    setLocalTitle(e.target.value); // 로컬 상태 업데이트, 부모 상태는 직접 변경하지 않음
  };

  const toggleUpdate = () => {
    if (inUpdate && localTitle.trim() === "") {
      setLocalTitle(title); // 수정 모드 종료 시, 제목이 공백이면 이전 제목으로 되돌림
    }
    setInUpdate((prev) => !prev);
  };

  return (
    <div className="bg-white fixed w-full shadow-md flex px-6 py-3 justify-between gap-2">
      <div onClick={onBackClick}>
        <ArrowBackIcon />
      </div>

      <input
        ref={inputRef}
        value={localTitle}
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
