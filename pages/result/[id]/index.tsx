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
                <div className="flex flex-col justify-center pt-4">
                  {(item.surveyQuestion.questionType === "SINGLE_CHOICE" ||
                    item.surveyQuestion.questionType === "MULTIPLE_CHOICE") && (
                    <>
                      <DonutChart item={item} surveyResult={surveyResult} />
                      <AgeBarChart item={item} surveyResult={surveyResult} />
                      <GenderBarChart item={item} surveyResult={surveyResult} />
                    </>
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
