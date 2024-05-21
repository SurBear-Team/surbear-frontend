import { FilterIcon } from "@/pages/components/styles/Icons";
import { useEffect, useState } from "react";
import { engToKorAge } from "./AgeBarChart";
import { engToKorGender } from "./GenderBarChart";
import { SurveyFilter } from "./SurveyFilter";
import { SurveyResult } from "./resultInterface";
import { engAgeCategories } from "./categories";

export interface SurveyQuestion {
  id: number;
}

export interface SurveyData {
  surveyQuestion: SurveyQuestion;
}

interface SurveyFilterProps {
  data: SurveyData[]; // data가 SurveyData 타입의 배열이라고 명시
  setSurveyIds: (ids: number[]) => void; // setSurveyIds 함수의 타입 명시
  item: SurveyData; // item이 SurveyData 타입이라고 명시
  surveyResult: { [key: string]: SurveyResult }; // surveyResult의 타입 명시, 더 구체적인 타입으로 대체 가능
}

const engGenderOptions = ["MALE", "FEMALE"];

export function ShortAnswerSubjective({
  data,
  setSurveyIds,
  item,
  surveyResult,
}: SurveyFilterProps) {
  const [showFilter, setShowFilter] = useState<{ [key: number]: boolean }>({});

  const ageOptions = ["20대 미만", "20대", "30대", "40대", "50대", "60대 이상"];
  const genderOptions = ["남자", "여자"];

  // 실제 필터 옵션을 저장하는 상태
  const [filterOptions, setFilterOptions] = useState<{
    [questionId: number]: { age: string[]; gender: string[] };
  }>({});

  // 임시 필터 옵션을 저장하는 상태(적용 누르기 전)
  const [prevFilterOptions, setPrevFilterOptions] = useState<{
    [questionId: number]: { age: string[]; gender: string[] };
  }>({});

  // 필터 옵션 토글 (임시 상태에 저장)
  const toggleFilterOption = (
    questionId: number,
    optionType: "age" | "gender", //  필터 유형
    option: string, // 선택할지말지 옵션
    all: boolean = false //  '전체' 옵션 선택 여부
  ) => {
    // 이전 필터 상태를 기반으로 새로운 필터 상태 결정
    setPrevFilterOptions((prev) => {
      const currentOptions = prev[questionId] // 이전 질문에 대한 필터 옵션을 가져옴
        ? prev[questionId][optionType] || []
        : []; // 없다면 빈 배열로 시작

      // "전체" 옵션이 선택된 경우
      if (all) {
        // 현재 선택된 옵션이 모든 옵션을 포함하고 있다면, 모든 옵션을 제거
        if (
          currentOptions.length ===
          (optionType === "age" ? ageOptions.length : genderOptions.length)
        ) {
          // 이미 모든 옵션이 선택되어 있으면 모두 제거
          return {
            ...prev,
            [questionId]: {
              ...prev[questionId],
              [optionType]: [], // 해당 필터 유형의 옵션을 빈 배열로
            },
          };
        } else {
          // 그렇지 않다면 모든 옵션을 선택
          return {
            ...prev,
            [questionId]: {
              ...prev[questionId],
              [optionType]:
                optionType === "age"
                  ? [...engAgeCategories]
                  : [...engGenderOptions],
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
              ? currentOptions.filter((o) => o !== option) // 옵션 제거
              : [...currentOptions, option], // 옵션 추가
          },
        };
      }
    });
  };

  // 필터 적용 버튼 핸들링 (임시 상태를 최종 상태로 적용)
  const applyFilters = (questionId: number) => {
    // 필터 상태 업데이트
    setFilterOptions((prev) => ({
      // 선택한 질문 id에 대한 필터 옵션을 임시에서 최종으로 옮김
      ...prev,
      [questionId]: prevFilterOptions[questionId],
    }));
    setShowFilter((prev) => ({
      ...prev,
      [questionId]: false,
    }));
  };

  // 필터 창 토글
  const handleFilterClick = (questionId: number) => {
    setShowFilter((prev) => ({ ...prev, [questionId]: !prev[questionId] }));
    // 필터를 열 때 임시 상태를 현재 필터 상태로 초기화
    if (!showFilter[questionId]) {
      setPrevFilterOptions((prev) => ({
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
      // 데이터가 존재할 경우, 각 항목에서 설문 질문의 ID를 추출합니다.
      const ids = data.map((item) => item.surveyQuestion.id);
      // 추출한 ID 배열을 상태에 저장
      setSurveyIds(ids);
      // 모든 질문 id에 대해 필터 창의 표시 상태를 'false'로 초기화합니다. 필터 창이 닫혀있음을 의미
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

  // 버튼 스타일 결정
  const getButtonStyle = (
    questionId: number,
    optionType: "age" | "gender",
    option: string
  ) => {
    const isSelected =
      prevFilterOptions[questionId] &&
      prevFilterOptions[questionId][optionType].includes(option);
    return isSelected ? "primary-btn-style" : "white-bg-primary-btn";
  };

  // "전체" 버튼에 대한 스타일 결정
  const isAllSelected = (questionId: number, optionType: "age" | "gender") => {
    const options = optionType === "age" ? engAgeCategories : engGenderOptions;
    // 선택된 옵션 목록을 가져옴
    const selectedOptions = prevFilterOptions[questionId]
      ? prevFilterOptions[questionId][optionType] || []
      : [];
    // 모든 옵션이 선택된 상태인지 확인
    return options.every((option) => selectedOptions.includes(option));
  };

  // 필터링된 응답을 반환하는 함수
  const filteredResponses = (questionId: number, responses: SurveyResult[]) => {
    const ageFilter = filterOptions[questionId]?.age || [];
    const genderFilter = filterOptions[questionId]?.gender || [];

    if (ageFilter.length === 0 && genderFilter.length === 0) {
      return responses; // 필터가 없으면 모든 응답 반환
    }

    // 필터 조건에 맞는 응답만 필터링하여 반환
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
          className="flex items-center gap-1 cursor-pointer whitespace-nowrap"
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
          result.response?.map(
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
        <SurveyFilter
          item={item}
          handleCancel={handleCancel}
          toggleFilterOption={toggleFilterOption}
          isAllSelected={isAllSelected}
          getButtonStyle={getButtonStyle}
          applyFilters={applyFilters}
        />
      )}
    </>
  );
}
