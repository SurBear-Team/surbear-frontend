import api from "@/pages/api/config";
import { TopBar } from "@/pages/components/TopBar/TopBar";
import { SurveyData } from "@/pages/edit-survey/editInterface";
import { TypeDropDown } from "@/pages/my-survey/components/TypeDropDown";
import router from "next/router";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import Chart from "react-apexcharts";

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
      console.log(ids);
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

  const filteredList = ["전체", "성별", "나이"];
  const [showFilter, setShowFilter] = useState(false);
  const [filterType, setFilterType] = useState("전체");

  // 전체, 성별, 나이 선택하는 함수
  const handleFilterSelect = (selectedFilterType: string) => {
    setFilterType(selectedFilterType);
    setShowFilter(false);
  };

  // surveyResult 객체를 배열로 변환하고 콘솔에 출력
  useEffect(() => {
    if (surveyResult) {
      const resultArray = Object.entries(surveyResult);
      resultArray.map(([key, value]) => {
        console.log(`Key: ${key}, Value:`, JSON.stringify(value, null, 2));
      });
    }
  }, [surveyResult]);

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

                <div className="flex whitespace-nowrap gap-4 pr-2">
                  구분
                  <TypeDropDown
                    onShowTypeClick={() => {
                      setShowFilter((prev) => !prev);
                    }}
                    showType={showFilter}
                    typeType={filterType}
                    typeList={filteredList}
                    onTypeSelect={handleFilterSelect}
                  />
                </div>
                <div className="flex justify-center pt-4">
                  {(item.surveyQuestion.questionType === "SINGLE_CHOICE" ||
                    item.surveyQuestion.questionType === "MULTIPLE_CHOICE") && (
                    <Chart
                      options={{
                        labels: item.options.map((option) => option.answer),
                        legend: {
                          show: true, // 범례를 표시
                          position: "bottom",
                        },
                        // 반응형 설정
                        responsive: [
                          {
                            breakpoint: 200, // 이 크기 이하의 화면에선 options에 정의된 스타일 적용
                            options: {
                              chart: {
                                width: 180,
                              },
                              legend: {
                                show: false, // 범례
                              },
                            },
                          },
                        ],
                      }}
                      series={item.options.map((option) => {
                        // reduce로 response를 순회하며 surveyResult에서 해당 답변의 출현 횟수를 계산
                        const answerCount = Object.values(surveyResult).reduce(
                          (count, response) => {
                            response.response.forEach((res) => {
                              // res는 개별 응답의 상세정보
                              if (
                                res.questionId === item.surveyQuestion.id &&
                                res.questionType ===
                                  item.surveyQuestion.questionType
                              ) {
                                // 각 답변이 현재 옵션의 답변과 일치하는지 검사
                                res.request.answers.forEach((ans) => {
                                  if (ans === option.answer) {
                                    count++; // 조건에 맞는 응답이면 count +1
                                  }
                                });
                              }
                            });
                            return count;
                          },
                          0 // 초기값
                        );
                        return answerCount;
                      })} // 각 옵션의 응답 수
                      type="donut" // 차트 형식
                      width="345" // 두께
                    />
                  )}
                </div>
                <div className="gray-line my-8" />
              </>
            ))}
        </div>
      </div>
    </>
  );
}
