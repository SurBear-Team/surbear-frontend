import { useEffect, useState } from "react";
import { ShortAnswerType } from "./ShortAnswerQuestion";
import { CancleSaveButtonFrame } from "../../components/CancleSaveButtonFrame";
import { MultipleChoiceQuestion } from "./MultipleChoiceQuestion";
import { TypeDropDown } from "../../components/TypeDropDown";
import { Dialog } from "@/pages/components/Dialog";
import { MyCheckBox } from "@/pages/components/MyCheckBox";
import api from "@/pages/api/config";
import { useRecoilValue } from "recoil";
import { surveyIdAtom } from "../../surveyState";
import { korToEngTypeMapping } from "../../components/typeMapping";
import { useQueryClient } from "react-query";
import { useOneBtnDialog } from "@/pages/hooks/useOneBtnDialog";

interface MakeSurveyProps {
  addNewSurveyComponent: (surveyData: {
    title: string;
    type: string;
    choices?: string[];
    count?: number;
  }) => void;
  onCancel: () => void;
  title: string | null;
  setIsNewSurvey?: (value: (prevState: boolean) => boolean) => void;
  page?: number;
}

export const MakeSurvey = ({
  addNewSurveyComponent,
  onCancel,
  title,
  setIsNewSurvey,
  page,
}: MakeSurveyProps) => {
  const queryClient = useQueryClient();
  const typeList = [
    "객관식 - 단일 선택",
    "객관식 - 다중 선택",
    "단답형",
    "슬라이더",
    "주관식",
  ];
  const surveyId = useRecoilValue(surveyIdAtom);

  const [showType, setShowType] = useState(false);
  const [typeType, setTypeType] = useState("객관식 - 단일 선택");
  const [nowType, setNowType] = useState("SINGLE_CHOICE");

  // 원버튼 다이얼로그
  const { oneBtnDialog, showOneBtnDialog, hideOneBtnDialog } =
    useOneBtnDialog();

  // 필수 답변 체크 박스
  const [isChecked, setIsChecked] = useState(false);
  const handleCheckboxChange = () => {
    setIsChecked((isChecked) => !isChecked);
  };

  const [firstTitle, setFirstTitle] = useState(title);

  // 객, 단, 슬 선택하는 함수
  const handleTypeSelect = (selectedTypeType: string) => {
    const englishType =
      korToEngTypeMapping[selectedTypeType] || "SINGLE_CHOICE";
    setTypeType(selectedTypeType);
    setShowType(false);
    setNowType(englishType);
  };

  // (공통) 질문 제목
  const [questionTitle, setQuestionTitle] = useState(firstTitle || "");

  const handleTitleChange = (e: any) => {
    setQuestionTitle(e.target.value);
  };

  // (객관식) 답변들 배열, 처음엔 빈 답변 2개
  const [choices, setChoices] = useState(["", ""]);
  // (객관식) 새 답변 추가
  const addChoice = () => {
    setChoices([...choices, ""]);
  };
  // (객관식) 중복된 답변 체크
  const [hasDuplicates, setHasDuplicates] = useState(false);

  // 객관식 답변들의 상태가 변경될 때마다 중복 체크
  useEffect(() => {
    if (
      typeType === "객관식 - 단일 선택" ||
      typeType === "객관식 - 다중 선택"
    ) {
      const uniqueChoices = new Set(choices);
      setHasDuplicates(uniqueChoices.size !== choices.length);
    } else {
      // 중복 체크가 필요없는 유형일 경우 중복 상태를 false로 설정
      setHasDuplicates(false);
    }
  }, [choices, typeType]);

  // (객관식) 답변 삭제
  const deleteChoice = (index: number) => {
    // 2개 이상일 때만 삭제
    if (choices.length > 2) {
      const newChoices = choices.filter((_, i) => i !== index);
      setChoices(newChoices);
    } else {
      showOneBtnDialog("답변은 최소 2개로 해주세요");
    }
  };
  // (객관식) 답변 onChange
  const handleChoiceChange = (index: number, newText: string) => {
    const updatedChoices = choices.map((choice, choiceIndex) => {
      if (index === choiceIndex) {
        return newText; // 선택된 답변의 텍스트 업데이트
      }
      return choice;
    });
    setChoices(updatedChoices); // 변경된 답변 배열로 업데이트
  };

  // (단답형) 최대 글자 수
  const [count, setCount] = useState(788183);
  // (공통) 저장 버튼
  const onSaveClick = async () => {
    const isTitleEmpty = !questionTitle.trim();
    if (isTitleEmpty) {
      showOneBtnDialog("제목을 입력해주세요");
      return; // 함수 중단
    }

    if (hasDuplicates) {
      showOneBtnDialog("중복된 답변이 있습니다. 다시 확인해주세요");
      return;
    }

    // (객관식)
    if (
      typeType === "객관식 - 단일 선택" ||
      typeType === "객관식 - 다중 선택"
    ) {
      const isEmptyAnswer = choices.some((choice) => !choice.trim());
      if (isEmptyAnswer) {
        showOneBtnDialog("답변을 모두 입력해주세요");
        return; // 함수 중단
      }
      const multipleChoiceSurveyData = {
        type: typeType,
        title: questionTitle,
        choices: choices,
      };

      addNewSurveyComponent(multipleChoiceSurveyData);
    }
    // (단답형)
    else if (typeType === "단답형" || typeType === "주관식") {
      const shortAnswerSurveyData = {
        type: typeType,
        title: questionTitle,
        count: count,
      };
      addNewSurveyComponent(shortAnswerSurveyData);
    }
    // (슬라이더)
    else if (typeType === "슬라이더") {
      const sliderSurveyData = {
        type: typeType,
        title: questionTitle,
        choices: [],
      };
      addNewSurveyComponent(sliderSurveyData);
    }

    try {
      const response = await api.post("/survey/question", {
        answers: choices, // 객관식일때만
        surveyQuestion: {
          surveyId: surveyId,
          questionType: nowType,
          content: questionTitle,
          page: page,
          questionOrder: 0, // ㅇㅅㅇ?
          maxText: count, // 임시
          required: isChecked,
        },
      });

      // 저장 후 입력 필드 초기화
      setQuestionTitle("");
      setChoices(["", ""]);
      setFirstTitle("");

      // 데이터 갱신을 위해 refetch 호출
      queryClient.invalidateQueries("new-survey");
    } catch (error) {
      console.error(error);
      showOneBtnDialog("네트워크 에러. 나중에 다시 시도해주세요");
    }
  };

  const onSaveAndAddClick = () => {
    onSaveClick();
    setIsNewSurvey?.(() => true);
  };

  return (
    <>
      <div className="bg-gray-1 flex flex-col justify-center h-auto p-6 w-full">
        <div className="base-gray-9-text pb-4">새 질문 만들기</div>
        {/* 형식 필수답변 */}
        <div className="flex-center gap-4">
          <div className="flex gap-4 w-full items-center">
            {/* 형식 고르기 */}
            <div className="base-gray-9-text whitespace-nowrap">형식</div>
            <TypeDropDown
              onShowTypeClick={() => {
                setShowType((prev) => !prev);
              }}
              showType={showType}
              typeType={typeType}
              typeList={typeList}
              onTypeSelect={handleTypeSelect}
            />
          </div>

          <div className="flex gap-1 items-center">
            <div className="base-gray-9-text whitespace-nowrap">필수 답변</div>
            <MyCheckBox
              isChecked={isChecked}
              onCheckClick={handleCheckboxChange}
            />
          </div>
        </div>

        {/* 질문 제목 */}
        <div className="flex flex-col gap-1">
          <div className="base-gray-9-text pt-2">질문 제목</div>
          <input
            className="main-input text-gray-9"
            value={questionTitle}
            onChange={handleTitleChange}
            placeholder="제목을 입력해주세요"
          />
        </div>

        {/* 답변들 */}
        {(typeType === "객관식 - 단일 선택" ||
          typeType === "객관식 - 다중 선택") && (
          <>
            {/* 회색선 */}
            <div className="gray-line my-8" />
            <MultipleChoiceQuestion
              choices={choices}
              addChoice={addChoice}
              deleteChoice={deleteChoice}
              handleChoiceChange={handleChoiceChange}
            />
          </>
        )}

        {(typeType === "단답형" || typeType === "주관식") && (
          <>
            <ShortAnswerType setCount={setCount} />
            <div className="gray-line mt-8" />
          </>
        )}

        {typeType === "슬라이더" && (
          <>
            <div className="gray-line mt-8" />
          </>
        )}

        {/* 취소 저장 저장후새질문추가 */}
        <CancleSaveButtonFrame
          onCancleClick={onCancel}
          onSaveClick={onSaveClick}
          onSaveAndAddClick={onSaveAndAddClick}
        />
      </div>
      <div className="fixed h-screen z-50 flex justify-center">
        {oneBtnDialog.open && (
          <Dialog
            title={oneBtnDialog.title}
            onlyOneBtn
            rightText="닫기"
            onRightClick={hideOneBtnDialog}
          />
        )}
      </div>
    </>
  );
};
