import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Overlay } from "../components/styles/Overlay";
import { Checkbox } from "./Components/CheckBox";
import { Sheet } from "./Components/Sheet";

type CheckboxName =
  | "all"
  | "terms1"
  | "terms2"
  | "terms3"
  | "terms4"
  | "terms5";

export default function Clause() {
  const router = useRouter();

  const [isChecked, setIsChecked] = useState<Record<CheckboxName, boolean>>({
    all: false,
    terms1: false,
    terms2: false,
    terms3: false,
    terms4: false,
    terms5: false,
  });

  useEffect(() => {
    const { terms1, terms2, terms3, terms4, terms5 } = isChecked;
    setIsChecked((prevState) => ({
      ...prevState,
      all: terms1 && terms2 && terms3 && terms4 && terms5,
    }));
  }, [
    isChecked.terms1,
    isChecked.terms2,
    isChecked.terms3,
    isChecked.terms4,
    isChecked.terms5,
  ]);

  const handleCheckboxClick = (name: CheckboxName) => {
    if (name === "all") {
      const isAllChecked = !isChecked.all;
      setIsChecked({
        all: isAllChecked,
        terms1: isAllChecked,
        terms2: isAllChecked,
        terms3: isAllChecked,
        terms4: isAllChecked,
        terms5: isAllChecked,
      });
    } else {
      setIsChecked((prevState) => ({
        ...prevState,
        [name]: !prevState[name],
      }));
    }
  };

  const [showSheet, setShowSheet] = useState(false);
  const toggleShowSheet = () => {
    setShowSheet(!showSheet);
  };

  const [sheetTitle, setSheetTitle] = useState("");
  const handleShowSheet = (termKey: CheckboxName) => {
    setSheetTitle(termKey); // 약관의 제목을 설정
    setShowSheet(true); // Sheet를 표시
  };

  return (
    <>
      {/* 탑바 */}
      <div className="bg-white fixed">
        <div className="flex gap-2 pl-6 py-3 ">
          <div onClick={router.back}>⬅</div>
          <div className="font-extrabold">회원가입</div>
        </div>
      </div>
      {/* 본문 */}
      <div className="w-full max-w-xl mx-auto h-screen bg-white items-center flex justify-center">
        <div className="w-full">
          <Checkbox
            inputChecked={isChecked.all}
            onClick={() => handleCheckboxClick("all")}
            label="전체 동의"
            isAll={true}
          />
          {/* 약관 블록 */}
          <Checkbox
            inputChecked={isChecked.terms1}
            onClick={() => handleCheckboxClick("terms1")}
            label="[필수] 개인정보수집및활용동의1"
            isAll={false}
            showSheet={() => handleShowSheet("terms1")}
          />
          {/* 약관 블록 */}

          <Checkbox
            inputChecked={isChecked.terms2}
            onClick={() => handleCheckboxClick("terms2")}
            label="[필수] 개인정보수집및활용동의2"
            isAll={false}
            showSheet={() => handleShowSheet("terms2")}
          />

          <Checkbox
            inputChecked={isChecked.terms3}
            onClick={() => handleCheckboxClick("terms3")}
            label="[필수] 개인정보수집및활용동의3"
            isAll={false}
            showSheet={() => handleShowSheet("terms3")}
          />

          <Checkbox
            inputChecked={isChecked.terms4}
            onClick={() => handleCheckboxClick("terms4")}
            label="[필수] 개인정보수집및활용동의4"
            isAll={false}
            showSheet={() => handleShowSheet("terms4")}
          />

          <Checkbox
            inputChecked={isChecked.terms5}
            onClick={() => handleCheckboxClick("terms5")}
            label="[필수] 개인정보수집및활용동의5"
            isAll={false}
            showSheet={() => handleShowSheet("terms5")}
          />

          {/* 회색 선 */}
          <div className="bg-[#EEEEEE] w-full h-[1px] mt-4 mx-10 max-w-[313px]" />

          {/* 다음 버튼 */}
          <button className="mt-8 bg-white w-full font-extrabold rounded-lg py-3 mx-12 max-w-[297px] border-[1.5px] border-[#6E7CF2] text-[#6E7CF2]">
            다음
          </button>
        </div>
        {showSheet && (
          <>
            {/* 오버레이 배경 */}
            <Overlay />
            {/* 시트 */}
            <Sheet termKey={sheetTitle} onClose={toggleShowSheet} />
          </>
        )}
      </div>
    </>
  );
}
