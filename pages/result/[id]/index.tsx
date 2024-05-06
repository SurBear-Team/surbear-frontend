import api from "@/pages/api/config";
import { TopBar } from "@/pages/components/TopBar/TopBar";
import { SurveyData } from "@/pages/edit-survey/editInterface";
import { TypeDropDown } from "@/pages/my-survey/components/TypeDropDown";
import router from "next/router";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { DonutChart } from "../components/DonutChart";
import { AgeBarChart, engToKorAge } from "../components/AgeBarChart";
import { GenderBarChart, engToKorGender } from "../components/GenderBarChart";
import { FilterIcon } from "@/pages/components/styles/Icons";
import { Overlay } from "@/pages/components/styles/Overlay";

interface SurveyResponseDetail {
  questionId: number;
  questionType: string; // 객, 단, 슬
  request: {
    answers: string[];
  };
}

interface SurveyResult {
  age: string; // "TWENTIES", "THIRTIES" .... 등등
  gender: string;
  response: SurveyResponseDetail[];
}

export default function Result() {
  const { id } = router.query;
  // 설문 데이터 가져오기
  const fetchSurvey = async () => {
    const { data } = await api.get(`/survey/management/option/${id}`);
    return data;
  };
  const { data } = useQuery<SurveyData[]>(["result", id], fetchSurvey);
  const [surveyIds, setSurveyIds] = useState<number[]>([]); // 질문 번호들 담은 배열
  // 질문 번호들 배열에 담기
  useEffect(() => {
    if (data) {
      const ids = data.map((item) => item.surveyQuestion.id);
      setSurveyIds(ids);
    }
  }, [data]);

  console.log(data);

  // 설문 결과 담기
  const [surveyResult, setSurveyResult] = useState<{
    [key: string]: SurveyResult;
  }>({});

  const postSurveyResult = async () => {
    try {
      const requestBody = {
        id: id,
        questIdList: surveyIds,
      };
      const response = await api.post("/survey/result", requestBody);
      setSurveyResult(response.data);
      console.log("설문 결과", surveyResult);
    } catch (error) {
      console.error("에러떴숴잉 ㅇㅅㅇ", error);
    }
  };

  // surveyIds가 준비되면 POST 요청 실행
  useEffect(() => {
    if (surveyIds.length > 0) {
      postSurveyResult();
    }
  }, [surveyIds]);

  const sortedList = ["전체", "성별", "나이"];
  const [showSort, setShowSort] = useState<{ [key: number]: boolean }>({});
  const [sortTypes, setSortTypes] = useState<{
    [questionId: number]: string;
  }>({});

  const handleSortSelect = (questionId: number, selectedSortType: string) => {
    setSortTypes((prev) => ({ ...prev, [questionId]: selectedSortType }));
    setShowSort((prev) => ({ ...prev, [questionId]: false }));
  };

  useEffect(() => {
    if (data) {
      const initialSortTypes = data.reduce(
        (acc, item) => ({
          ...acc,
          [item.surveyQuestion.id]: "전체",
        }),
        {}
      );
      setSortTypes(initialSortTypes);
      setShowSort(
        data.reduce(
          (acc, item) => ({
            ...acc,
            [item.surveyQuestion.id]: false,
          }),
          {}
        )
      );
    }
  }, [data]);

  // 필터 부분
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

  return (
    <>
      <TopBar title="설문 결과" hasBack subTitle="임시 타이틀" />
      <div className="white-screen flex-col pt-20 justify-start">
        <div className="inner-screen px-6 py-8 relative">
          {/* 질문 리스트 */}
          {data &&
            data.map((item, index) => (
              <>
                <div key={index} className="sm-gray-9-text text-base pb-4">
                  {index + 1}. {item.surveyQuestion.content}
                </div>

                <div className="flex flex-col items-center pt-2">
                  {(item.surveyQuestion.questionType === "SINGLE_CHOICE" ||
                    item.surveyQuestion.questionType === "MULTIPLE_CHOICE") && (
                    <>
                      <div className="flex whitespace-nowrap gap-4 pr-2 w-full pb-4">
                        구분
                        <TypeDropDown
                          onShowTypeClick={() =>
                            setShowSort((prev) => ({
                              ...prev,
                              [item.surveyQuestion.id]:
                                !prev[item.surveyQuestion.id],
                            }))
                          }
                          showType={showSort[item.surveyQuestion.id] || false}
                          typeType={sortTypes[item.surveyQuestion.id] || "전체"}
                          typeList={sortedList}
                          onTypeSelect={(type) =>
                            handleSortSelect(item.surveyQuestion.id, type)
                          }
                        />
                      </div>

                      <>
                        {sortTypes[item.surveyQuestion.id] === "전체" && (
                          <DonutChart item={item} surveyResult={surveyResult} />
                        )}
                        {sortTypes[item.surveyQuestion.id] === "나이" && (
                          <AgeBarChart
                            item={item}
                            surveyResult={surveyResult}
                          />
                        )}
                        {sortTypes[item.surveyQuestion.id] === "성별" && (
                          <GenderBarChart
                            item={item}
                            surveyResult={surveyResult}
                          />
                        )}
                      </>
                    </>
                  )}

                  {/* 단답형 혹은 객관식일 경우 */}
                  {(item.surveyQuestion.questionType === "SHORT_ANSWER" ||
                    item.surveyQuestion.questionType === "SUBJECTIVE") && (
                    <>
                      <div className="flex items-center justify-start w-full pb-4 gap-4">
                        <div
                          onClick={() =>
                            handleFilterClick(item.surveyQuestion.id)
                          }
                          className="flex items-center gap-1 cursor-pointer"
                        >
                          <FilterIcon /> 필터
                        </div>

                        <div className="flex items-center gap-2">
                          {filterOptions[item.surveyQuestion.id] && (
                            <div className="flex gap-1">
                              {filterOptions[
                                item.surveyQuestion.id
                              ]?.gender.map((gender) => (
                                <div
                                  className="flex items-center bg-primary-1 rounded-[40px] px-2 py-1 gap-1 cursor-pointer"
                                  key={gender}
                                >
                                  <span className="text-xs font-bold text-white">
                                    {gender}
                                  </span>
                                </div>
                              ))}
                              {filterOptions[item.surveyQuestion.id]?.age.map(
                                (age) => (
                                  <div
                                    className="flex items-center bg-primary-1 rounded-[40px] px-2 py-1 gap-1 cursor-pointer"
                                    key={age}
                                  >
                                    <span
                                      className="text-xs font-bold text-white"
                                      key={age}
                                    >
                                      {age}
                                    </span>
                                  </div>
                                )
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="w-full  rounded-lg border-[1px] border-gray-5 text-gray-9">
                        {(item.surveyQuestion.questionType === "SHORT_ANSWER" ||
                          item.surveyQuestion.questionType === "SUBJECTIVE") &&
                          Object.values(surveyResult).map(
                            (result: SurveyResult) =>
                              result.response.map(
                                (response: any) =>
                                  response.questionId ===
                                    item.surveyQuestion.id && (
                                    <div
                                      className="w-full flex items-center p-2 gap-2 border-b-[1px] border-gray-2"
                                      key={response.questionId}
                                    >
                                      <div className="p-2 font-bold text-xs flex justify-center items-center">
                                        {engToKorAge[result.age]}

                                        {engToKorGender[result.gender]}
                                      </div>
                                      <div className="text-sm">
                                        {response.request.answers}
                                      </div>
                                    </div>
                                  )
                              )
                          )}
                      </div>
                    </>
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
                            toggleFilterOption(
                              item.surveyQuestion.id,
                              "gender",
                              "",
                              true
                            )
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
                            toggleFilterOption(
                              item.surveyQuestion.id,
                              "gender",
                              "남자"
                            )
                          }
                          className={`w-full py-1 text-center border-[1px] border-primary-1 ${getButtonStyle(
                            item.surveyQuestion.id,
                            "gender",
                            "남자"
                          )} rounded-[40px] cursor-pointer`}
                        >
                          남자
                        </button>
                        <button
                          onClick={() =>
                            toggleFilterOption(
                              item.surveyQuestion.id,
                              "gender",
                              "여자"
                            )
                          }
                          className={`w-full py-1 text-center border-[1px] border-primary-1 ${getButtonStyle(
                            item.surveyQuestion.id,
                            "gender",
                            "여자"
                          )} rounded-[40px] cursor-pointer`}
                        >
                          여자
                        </button>
                      </div>

                      <div className="gray-line mb-4 mx-4" />

                      {/* 나이 */}
                      <span className="text-gray-9 font-medium ">나이</span>
                      <div className="flex flex-col px-12 w-full justify-between gap-4">
                        <button
                          onClick={() =>
                            toggleFilterOption(
                              item.surveyQuestion.id,
                              "age",
                              "",
                              true
                            )
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
                                "20대 미만"
                              )
                            }
                            className={`w-full py-1 text-center border-[1px] border-primary-1 ${getButtonStyle(
                              item.surveyQuestion.id,
                              "age",
                              "20대 미만"
                            )} rounded-[40px] cursor-pointer`}
                          >
                            20대 미만
                          </button>
                          <button
                            onClick={() =>
                              toggleFilterOption(
                                item.surveyQuestion.id,
                                "age",
                                "20대"
                              )
                            }
                            className={`w-full py-1 text-center border-[1px] border-primary-1 ${getButtonStyle(
                              item.surveyQuestion.id,
                              "age",
                              "20대"
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
                                "30대"
                              )
                            }
                            className={`w-full py-1 text-center border-[1px] border-primary-1 ${getButtonStyle(
                              item.surveyQuestion.id,
                              "age",
                              "30대"
                            )} rounded-[40px] cursor-pointer`}
                          >
                            30대
                          </button>
                          <button
                            onClick={() =>
                              toggleFilterOption(
                                item.surveyQuestion.id,
                                "age",
                                "40대"
                              )
                            }
                            className={`w-full py-1 text-center border-[1px] border-primary-1 ${getButtonStyle(
                              item.surveyQuestion.id,
                              "age",
                              "40대"
                            )} rounded-[40px] cursor-pointer`}
                          >
                            40대
                          </button>
                        </div>
                        <div className="w-full flex justify-between gap-4">
                          <button
                            onClick={() =>
                              toggleFilterOption(
                                item.surveyQuestion.id,
                                "age",
                                "50대"
                              )
                            }
                            className={`w-full py-1 text-center border-[1px] border-primary-1 ${getButtonStyle(
                              item.surveyQuestion.id,
                              "age",
                              "50대"
                            )} rounded-[40px] cursor-pointer`}
                          >
                            50대
                          </button>
                          <button
                            onClick={() =>
                              toggleFilterOption(
                                item.surveyQuestion.id,
                                "age",
                                "60대 이상"
                              )
                            }
                            className={`w-full py-1 text-center border-[1px] border-primary-1 ${getButtonStyle(
                              item.surveyQuestion.id,
                              "age",
                              "60대 이상"
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
            ))}
        </div>
      </div>
    </>
  );
}
