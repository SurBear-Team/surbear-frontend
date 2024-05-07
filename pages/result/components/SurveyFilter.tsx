import { FilterIcon } from "@/pages/components/styles/Icons";
import { useEffect, useState } from "react";
import { engToKorAge } from "./AgeBarChart";
import { engToKorGender } from "./GenderBarChart";
import { Overlay } from "@/pages/components/styles/Overlay";
import { SurveyResult } from "../[id]";

interface SurveyQuestion {
  id: number; // 또는 id가 string이면 그에 맞게 조정
}

interface SurveyData {
  surveyQuestion: SurveyQuestion;
}

interface SurveyFilterProps {
  data: SurveyData[]; // data가 SurveyData 타입의 배열이라고 명시
  setSurveyIds: (ids: number[]) => void; // setSurveyIds 함수의 타입 명시
  item: SurveyData; // item이 SurveyData 타입이라고 명시
  surveyResult: { [key: string]: any }; // surveyResult의 타입 명시, 더 구체적인 타입으로 대체 가능
}

export function SurveyFilter({
  data,
  setSurveyIds,
  item,
  surveyResult,
}: SurveyFilterProps) {
  const [showFilter, setShowFilter] = useState<{ [key: number]: boolean }>({});

  const ageOptions = ["20대 미만", "20대", "30대", "40대", "50대", "60대 이상"];
  const genderOptions = ["남자", "여자"];

  const [filterOptions, setFilterOptions] = useState<{
    [questionId: number]: { age: string[]; gender: string[] };
  }>({});

  // 임시 필터 옵션 상태 추가
  const [tempFilterOptions, setTempFilterOptions] = useState<{
    [questionId: number]: { age: string[]; gender: string[] };
  }>({});

  // 필터 옵션 토글 (임시 상태에 저장)
  const toggleFilterOption = (
    questionId: number,
    optionType: "age" | "gender",
    option: string,
    all: boolean = false
  ) => {
    setTempFilterOptions((prev) => {
      const currentOptions = prev[questionId]
        ? prev[questionId][optionType] || []
        : [];

      if (all) {
        // "전체" 옵션이 선택된 경우
        if (
          currentOptions.length ===
          (optionType === "age" ? ageOptions.length : genderOptions.length)
        ) {
          // 이미 모든 옵션이 선택되어 있으면 모두 제거
          return {
            ...prev,
            [questionId]: {
              ...prev[questionId],
              [optionType]: [],
            },
          };
        } else {
          // 그렇지 않다면 모든 옵션을 선택
          return {
            ...prev,
            [questionId]: {
              ...prev[questionId],
              [optionType]:
                optionType === "age" ? [...ageOptions] : [...genderOptions],
            },
          };
        }
      } else {
        // 일반 옵션 토글
        return {
          ...prev,
          [questionId]: {
            ...prev[questionId],
            [optionType]: currentOptions.includes(option)
              ? currentOptions.filter((o) => o !== option)
              : [...currentOptions, option],
          },
        };
      }
    });
  };

  // 필터 적용 버튼 핸들링 (임시 상태를 최종 상태로 적용)
  const applyFilters = (questionId: number) => {
    console.log("필터 적용", tempFilterOptions[questionId]);
    setFilterOptions((prev) => ({
      ...prev,
      [questionId]: tempFilterOptions[questionId],
    }));
    setShowFilter((prev) => ({
      ...prev,
      [questionId]: false,
    }));
  };

  // 필터 창 토글 및 초기화
  const handleFilterClick = (questionId: number) => {
    setShowFilter((prev) => ({ ...prev, [questionId]: !prev[questionId] }));
    // 필터를 열 때 임시 상태를 현재 필터 상태로 초기화
    if (!showFilter[questionId]) {
      setTempFilterOptions((prev) => ({
        ...prev,
        [questionId]: filterOptions[questionId] || { age: [], gender: [] },
      }));
    }
  };

  // 취소 버튼 핸들링
  const handleCancel = (questionId: number) => {
    setShowFilter((prev) => ({
      ...prev,
      [questionId]: false,
    }));
  };

  useEffect(() => {
    if (data) {
      const ids = data.map((item) => item.surveyQuestion.id);
      setSurveyIds(ids);
      setShowFilter(ids.reduce((acc, id) => ({ ...acc, [id]: false }), {}));
      // 각 질문 ID에 대해 빈 필터 옵션 초기화
      setFilterOptions(
        ids.reduce(
          (acc, id) => ({
            ...acc,
            [id]: { age: [], gender: [] },
          }),
          {}
        )
      );
    }
  }, [data]);

  const getButtonStyle = (
    questionId: number,
    optionType: "age" | "gender",
    option: string
  ) => {
    const isSelected =
      tempFilterOptions[questionId] &&
      tempFilterOptions[questionId][optionType].includes(option);
    return isSelected ? "primary-btn-style" : "white-bg-primary-btn";
  };

  // "전체" 버튼에 대한 스타일 결정
  const isAllSelected = (questionId: number, optionType: "age" | "gender") => {
    const options = optionType === "age" ? ageOptions : genderOptions;
    const selectedOptions = tempFilterOptions[questionId]
      ? tempFilterOptions[questionId][optionType] || []
      : [];
    return options.every((option) => selectedOptions.includes(option));
  };

  const filteredResponses = (questionId: number, responses: SurveyResult[]) => {
    const ageFilter = filterOptions[questionId]?.age || [];
    const genderFilter = filterOptions[questionId]?.gender || [];

    if (ageFilter.length === 0 && genderFilter.length === 0) {
      return responses; // 필터가 없으면 모든 응답 반환
    }

    return responses.filter((response) => {
      const ageMatches =
        ageFilter.length === 0 || ageFilter.includes(response.age);
      const genderMatches =
        genderFilter.length === 0 || genderFilter.includes(response.gender);
      return ageMatches && genderMatches;
    });
  };

  return (
    <>
      <div className="flex items-center justify-start w-full pb-4 gap-4">
        <div
          onClick={() => handleFilterClick(item.surveyQuestion.id)}
          className="flex items-center gap-1 cursor-pointer"
        >
          <FilterIcon /> 필터
        </div>

        <div className="flex items-center gap-2">
          {filterOptions[item.surveyQuestion.id] && (
            <div className="flex gap-1">
              {filterOptions[item.surveyQuestion.id]?.gender.map((gender) => (
                <div
                  className="flex items-center bg-primary-1 rounded-[40px] px-2 py-1 gap-1 cursor-pointer"
                  key={gender}
                >
                  <span className="text-xs font-bold text-white">
                    {`${engToKorGender[gender]}`}
                  </span>
                </div>
              ))}
              {filterOptions[item.surveyQuestion.id]?.age.map((age) => (
                <div
                  className="flex items-center bg-primary-1 rounded-[40px] px-2 py-1 gap-1 cursor-pointer"
                  key={age}
                >
                  <span className="text-xs font-bold text-white" key={age}>
                    {`${engToKorAge[age]}`}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="w-full rounded-lg border-[1px] border-gray-5 text-gray-9">
        {filteredResponses(
          item.surveyQuestion.id,
          Object.values(surveyResult)
        ).map((result) =>
          result.response.map(
            (response) =>
              response.questionId === item.surveyQuestion.id && (
                <div
                  className="w-full flex items-center p-2 gap-2 border-b-[1px] border-gray-2"
                  key={response.questionId}
                >
                  <div className="p-2 font-bold text-xs flex justify-center items-center">
                    {engToKorAge[result.age]} {engToKorGender[result.gender]}
                  </div>
                  <div className="text-sm">{response.request.answers}</div>
                </div>
              )
          )
        )}
      </div>
      <div className="gray-line my-8" />

      {showFilter[item.surveyQuestion.id] && (
        <>
          <Overlay onClick={() => {}} />
          <div className="fixed h-4/5 bottom-0 left-0 w-full flex flex-col bg-white border-[1px] rounded-t-lg px-6 gap-4 z-50">
            <button
              onClick={() => handleCancel(item.surveyQuestion.id)}
              className="pt-4 text-start text-gray-9 cursor-pointer"
            >
              X 취소
            </button>

            <div className="gray-line mb-4 mx-4" />

            <span className="text-gray-9 font-bold pb-2">필터</span>
            {/* 성별 */}
            <span className="text-gray-9 font-medium ">성별</span>
            <div className="flex gap-2 w-full px-12 justify-between pb-2">
              <button
                onClick={() =>
                  toggleFilterOption(item.surveyQuestion.id, "gender", "", true)
                }
                className={`w-full py-1 text-center border-[1px] border-primary-1 ${
                  isAllSelected(item.surveyQuestion.id, "gender")
                    ? "primary-btn-style"
                    : "white-bg-primary-btn"
                } rounded-[40px] cursor-pointer`}
              >
                전체
              </button>
              <button
                onClick={() =>
                  toggleFilterOption(item.surveyQuestion.id, "gender", "MALE")
                }
                className={`w-full py-1 text-center border-[1px] border-primary-1 ${getButtonStyle(
                  item.surveyQuestion.id,
                  "gender",
                  "MALE"
                )} rounded-[40px] cursor-pointer`}
              >
                남성
              </button>
              <button
                onClick={() =>
                  toggleFilterOption(item.surveyQuestion.id, "gender", "FEMALE")
                }
                className={`w-full py-1 text-center border-[1px] border-primary-1 ${getButtonStyle(
                  item.surveyQuestion.id,
                  "gender",
                  "FEMALE"
                )} rounded-[40px] cursor-pointer`}
              >
                여성
              </button>
            </div>

            <div className="gray-line mb-4 mx-4" />

            {/* 나이 */}
            <span className="text-gray-9 font-medium ">나이</span>
            <div className="flex flex-col px-12 w-full justify-between gap-4">
              <button
                onClick={() =>
                  toggleFilterOption(item.surveyQuestion.id, "age", "", true)
                }
                className={`w-full py-1 text-center border-[1px] border-primary-1 ${
                  isAllSelected(item.surveyQuestion.id, "age")
                    ? "primary-btn-style"
                    : "white-bg-primary-btn"
                } rounded-[40px] cursor-pointer`}
              >
                전체
              </button>
              <div className="w-full flex justify-between gap-4">
                <button
                  onClick={() =>
                    toggleFilterOption(
                      item.surveyQuestion.id,
                      "age",
                      "UNDER_TWENTY"
                    )
                  }
                  className={`w-full py-1 text-center border-[1px] border-primary-1 ${getButtonStyle(
                    item.surveyQuestion.id,
                    "age",
                    "UNDER_TWENTY"
                  )} rounded-[40px] cursor-pointer`}
                >
                  20대 미만
                </button>
                <button
                  onClick={() =>
                    toggleFilterOption(
                      item.surveyQuestion.id,
                      "age",
                      "TWENTIES"
                    )
                  }
                  className={`w-full py-1 text-center border-[1px] border-primary-1 ${getButtonStyle(
                    item.surveyQuestion.id,
                    "age",
                    "TWENTIES"
                  )} rounded-[40px] cursor-pointer`}
                >
                  20대
                </button>
              </div>
              <div className="w-full flex justify-between gap-4">
                <button
                  onClick={() =>
                    toggleFilterOption(
                      item.surveyQuestion.id,
                      "age",
                      "THIRTIES"
                    )
                  }
                  className={`w-full py-1 text-center border-[1px] border-primary-1 ${getButtonStyle(
                    item.surveyQuestion.id,
                    "age",
                    "THIRTIES"
                  )} rounded-[40px] cursor-pointer`}
                >
                  30대
                </button>
                <button
                  onClick={() =>
                    toggleFilterOption(
                      item.surveyQuestion.id,
                      "age",
                      "FOURTIES"
                    )
                  }
                  className={`w-full py-1 text-center border-[1px] border-primary-1 ${getButtonStyle(
                    item.surveyQuestion.id,
                    "age",
                    "FOURTIES"
                  )} rounded-[40px] cursor-pointer`}
                >
                  40대
                </button>
              </div>
              <div className="w-full flex justify-between gap-4">
                <button
                  onClick={() =>
                    toggleFilterOption(item.surveyQuestion.id, "age", "FIFTIES")
                  }
                  className={`w-full py-1 text-center border-[1px] border-primary-1 ${getButtonStyle(
                    item.surveyQuestion.id,
                    "age",
                    "FIFTIES"
                  )} rounded-[40px] cursor-pointer`}
                >
                  50대
                </button>
                <button
                  onClick={() =>
                    toggleFilterOption(
                      item.surveyQuestion.id,
                      "age",
                      "OVER_SIXTIES"
                    )
                  }
                  className={`w-full py-1 text-center border-[1px] border-primary-1 ${getButtonStyle(
                    item.surveyQuestion.id,
                    "age",
                    "OVER_SIXTIES"
                  )} rounded-[40px] cursor-pointer`}
                >
                  60대 이상
                </button>
              </div>
            </div>

            <div className="gray-line my-4 mx-4" />

            <button
              onClick={() => applyFilters(item.surveyQuestion.id)}
              className="w-full justify-self-center self-center py-1 mx-8 mb-4 text-center white-bg-primary-btn border-[1px] rounded-[40px] cursor-pointer"
            >
              적용
            </button>
          </div>
        </>
      )}
    </>
  );
}
