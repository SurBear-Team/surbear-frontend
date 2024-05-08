import api from "@/pages/api/config";
import { TopBar } from "@/pages/components/TopBar/TopBar";
import { SurveyData } from "@/pages/edit-survey/editInterface";
import { TypeDropDown } from "@/pages/my-survey/components/TypeDropDown";
import router from "next/router";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { DonutChart } from "../components/DonutChart";
import { AgeBarChart } from "../components/AgeBarChart";
import { GenderBarChart } from "../components/GenderBarChart";
import { SurveyFilter } from "../components/SurveyFilter";
import { GenderLineChart, LineChart } from "../components/LineChart";

export interface SurveyResponseDetail {
  questionId: number;
  questionType: string; // 객, 단, 슬
  request: {
    answers: string[];
  };
}

export interface SurveyResult {
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
                      <SurveyFilter
                        data={data}
                        setSurveyIds={setSurveyIds}
                        item={item}
                        surveyResult={surveyResult}
                      />
                    </>
                  )}

                  {/* 슬라이더 */}
                  {item.surveyQuestion.questionType === "SLIDER" && (
                    <>
                      <LineChart item={item} surveyResult={surveyResult} />
                      <GenderLineChart
                        item={item}
                        surveyResult={surveyResult}
                      />
                    </>
                  )}
                </div>
              </>
            ))}
        </div>
      </div>
    </>
  );
}
