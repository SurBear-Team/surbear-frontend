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
import { FilterIcon, XIcon } from "@/pages/components/styles/Icons";

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
  return (
    <>
      <TopBar title="설문 결과" hasBack subTitle="임시 타이틀" />
      <div className="white-screen flex-col pt-20 justify-start">
        <div className="inner-screen px-6 py-8">
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
                        <div className="flex items-center gap-1 cursor-pointer">
                          <FilterIcon /> 필터
                        </div>

                        <div className="flex items-center gap-2">
                          <div className="flex items-center bg-primary-1 rounded-[40px] px-2 py-1 gap-1 cursor-pointer">
                            {/* 예시로 적어둔 남성 */}
                            <span className="text-xs font-bold text-white">
                              남성
                            </span>
                            <div className="bg-white rounded-full">
                              <XIcon />
                            </div>
                          </div>

                          <div className="flex items-center bg-primary-1 rounded-[40px] px-2 py-1 gap-1 cursor-pointer">
                            {/* 예시로 적어둔 20대 */}
                            <span className="text-xs font-bold text-white">
                              20대
                            </span>
                            <div className="bg-white rounded-full">
                              <XIcon />
                            </div>
                          </div>
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
              </>
            ))}

          {showFilter && (
            <div className="w-full flex flex-col bg-white border-[1px] border-gray-2 rounded-t-lg pl-6 gap-4">
              <div
                onClick={() => {}}
                className="py-4 text-sm text-gray-9 cursor-pointer"
              >
                X 취소
              </div>

              <div className="gray-line mb-4 mx-4" />

              <span className="text-gray-9 font-bold pb-2">필터</span>
              {/* 성별 */}
              <span className="text-gray-9 font-medium ">성별</span>
              <div className="flex gap-2 w-full px-12 justify-between pb-2">
                <div
                  onClick={() => {}}
                  className="w-full py-1 text-center primary-btn-style rounded-[40px] cursor-pointer"
                >
                  전체
                </div>
                <div
                  onClick={() => {}}
                  className="w-full py-1 text-center border-[1px]  white-bg-primary-btn rounded-[40px] cursor-pointer"
                >
                  남자
                </div>
                <div
                  onClick={() => {}}
                  className="w-full py-1 text-center border-[1px] white-bg-primary-btn rounded-[40px] cursor-pointer"
                >
                  여자
                </div>
              </div>

              <div className="gray-line mb-4 mx-4" />

              {/* 나이 */}
              <span className="text-gray-9 font-medium ">나이</span>
              <div className="flex flex-col px-12 w-full justify-between gap-4">
                <div
                  onClick={() => {}}
                  className="w-full py-1 text-center white-bg-primary-btn border-[1px] rounded-[40px] cursor-pointer"
                >
                  전체
                </div>
                <div className="w-full flex justify-between gap-4">
                  <div
                    onClick={() => {}}
                    className="w-full py-1 text-center white-bg-primary-btn border-[1px] rounded-[40px] cursor-pointer"
                  >
                    20대 미만
                  </div>
                  <div
                    onClick={() => {}}
                    className="w-full py-1 text-center white-bg-primary-btn border-[1px] rounded-[40px] cursor-pointer"
                  >
                    20대
                  </div>
                </div>
                <div className="w-full flex justify-between gap-4">
                  <div
                    onClick={() => {}}
                    className="w-full py-1 text-center white-bg-primary-btn border-[1px] rounded-[40px] cursor-pointer"
                  >
                    30대
                  </div>
                  <div
                    onClick={() => {}}
                    className="w-full py-1 text-center white-bg-primary-btn border-[1px] rounded-[40px] cursor-pointer"
                  >
                    40대
                  </div>
                </div>
                <div className="w-full flex justify-between gap-4">
                  <div
                    onClick={() => {}}
                    className="w-full py-1 text-center white-bg-primary-btn border-[1px] rounded-[40px] cursor-pointer"
                  >
                    50대
                  </div>
                  <div
                    onClick={() => {}}
                    className="w-full py-1 text-center white-bg-primary-btn border-[1px] rounded-[40px] cursor-pointer"
                  >
                    60대 이상
                  </div>
                </div>
              </div>

              <div className="gray-line mb-4 mx-4" />

              <div
                onClick={() => {}}
                className="w-full py-1 text-center white-bg-primary-btn border-[1px] rounded-[40px] cursor-pointer"
              >
                적용
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
