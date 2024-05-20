import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Overlay } from "../components/styles/Overlay";
import { Checkbox } from "./Components/CheckBox";
import { Sheet } from "./Components/Sheet";

import { TopBar } from "../components/TopBar/TopBar";
import { Dialog } from "../components/Dialog";

type CheckboxName =
  | "all"
  | "terms1"
  | "terms2"
  | "terms3"
  | "terms4"
  | "terms5";

interface DialogState {
  open: boolean;
  title: string;
}

export default function Terms() {
  const router = useRouter();

  const [dialog, setDialog] = useState<DialogState>({
    open: false,
    title: "",
  });

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

  const [isButtonActive, setIsButtonActive] = useState(false);

  useEffect(() => {
    const { terms1, terms2, terms3, terms4, terms5, all } = isChecked;
    // 모든 조건이 참일 때만 버튼을 활성화
    setIsButtonActive(terms1 && terms2 && terms3 && terms4 && terms5 && all);
  }, [isChecked]);

  // 모든 필수 약관을 체크해야 다음으로 보내줌
  const handleNextButtonClick = () => {
    if (isButtonActive) {
      router.push("/sign-up/authentication");
    } else {
      setDialog({
        open: true,
        title: "약관 동의를 진행해주세요",
      });
    }
  };

  return (
    <>
      {/* 탑바 */}
      <TopBar hasBack noShadow title="회원가입" />
      {/* 본문 */}
      <div className="white-screen">
        <div className="inner-screen px-10">
          <div className="flex">
            <Checkbox
              inputChecked={isChecked.all}
              onClick={() => handleCheckboxClick("all")}
              label="전체 동의"
              isAll={true}
            />
          </div>
          {/* 약관 블록 */}
          <Checkbox
            inputChecked={isChecked.terms1}
            onClick={() => handleCheckboxClick("terms1")}
            label="[필수] 개인정보수집및활용동의1"
            isAll={false}
            showSheet={(e: MouseEvent) => {
              e.stopPropagation();
              handleShowSheet("terms1");
            }}
          />
          {/* 약관 블록 */}

          <Checkbox
            inputChecked={isChecked.terms2}
            onClick={() => handleCheckboxClick("terms2")}
            label="[필수] 개인정보수집및활용동의2"
            isAll={false}
            showSheet={(e: MouseEvent) => {
              e.stopPropagation();
              handleShowSheet("terms2");
            }}
          />

          <Checkbox
            inputChecked={isChecked.terms3}
            onClick={() => handleCheckboxClick("terms3")}
            label="[필수] 개인정보수집및활용동의3"
            isAll={false}
            showSheet={(e: MouseEvent) => {
              e.stopPropagation();
              handleShowSheet("terms3");
            }}
          />

          <Checkbox
            inputChecked={isChecked.terms4}
            onClick={() => handleCheckboxClick("terms4")}
            label="[필수] 개인정보수집및활용동의4"
            isAll={false}
            showSheet={(e: MouseEvent) => {
              e.stopPropagation();
              handleShowSheet("terms4");
            }}
          />

          <Checkbox
            inputChecked={isChecked.terms5}
            onClick={() => handleCheckboxClick("terms5")}
            label="[필수] 개인정보수집및활용동의5"
            isAll={false}
            showSheet={(e: MouseEvent) => {
              e.stopPropagation();
              handleShowSheet("terms5");
            }}
          />

          {/* 회색 선 */}
          <div className="gray-line mt-4" />

          {/* 다음 버튼 */}
          <button
            onClick={handleNextButtonClick}
            className="long-button w-full mt-8 min-w-[34px] white-bg-primary-btn"
          >
            다음
          </button>

          {dialog.open && (
            <Dialog
              title={dialog.title}
              rightText="확인"
              onRightClick={() => {
                setDialog((current) => ({ ...current, open: false }));
              }}
              onlyOneBtn
            />
          )}
        </div>
        {showSheet && (
          <>
            {/* 오버레이 배경 */}
            <Overlay onClick={toggleShowSheet} />
            {/* 시트 */}
            <Sheet
              showSheet={showSheet}
              termKey={sheetTitle}
              onClose={toggleShowSheet}
            />
          </>
        )}
      </div>
    </>
  );
}
