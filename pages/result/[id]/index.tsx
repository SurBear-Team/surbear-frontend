import api from "@/pages/api/config";
import { TopBar } from "@/pages/components/TopBar/TopBar";
import { SurveyData } from "@/pages/edit-survey/editInterface";
import { TypeDropDown } from "@/pages/my-survey/components/TypeDropDown";
import router from "next/router";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";

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
  const [surveyResult, setSurveyResult] = useState({});

  const postSurveyResult = async () => {
    try {
      const requestBody = {
        id: id,
        questIdList: surveyIds,
      };
      const response = await api.post("/survey/result", requestBody);
      setSurveyResult(response.data);
      console.log(surveyResult);
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

                <div className="gray-line my-8" />
              </>
            ))}
        </div>
      </div>
    </>
  );
}
