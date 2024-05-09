import { SurveyData } from "@/pages/edit-survey/editInterface";
import Chart from "react-apexcharts";
import { SurveyResult } from "../[id]";

interface BarChartProps {
  item: SurveyData; // 설문 데이터
  surveyResult: { [key: string]: SurveyResult }; // 설문 결과 데이터
}

interface ResponseProps {
  questionId: number; // 질문 ID
  request: { answers: string | string[] }; // 응답 내용
}

export const genderCategories = ["MALE", "FEMALE", "UNKNOWN"];

export const engToKorGender: { [key: string]: string } = {
  MALE: "남성",
  FEMALE: "여성",
  UNKNOWN: "미정",
};

export const GenderBarChart = ({ item, surveyResult }: BarChartProps) => {
  // 각 설문 옵션에 대한 응답 수를 계산하여 series 데이터 생성
  const series = item.options.map((option) => ({
    name: option.answer, // 각 옵션의 답변 내용
    // 성별별로 응답 수를 계산
    data: genderCategories.map((gender) => {
      // result 객체는 각 응답자의 응답을 담고 있음
      return Object.values(surveyResult).reduce((total, result) => {
        // 응답자의 성별이 현재 카테고리와 일치할 경우
        if (result.gender === gender) {
          // 해당 질문에 대한 응답이 현재 옵션의 답변과 일치하는 경우 카운트 증가
          result.response.forEach((response: ResponseProps) => {
            if (
              response.questionId === item.surveyQuestion.id &&
              response.request.answers.includes(option.answer)
            ) {
              total++;
            }
          });
        }
        return total; // 계산된 응답 수 반환
      }, 0); // 초기값 0
    }),
  }));

  const options = {
    chart: {
      type: "bar" as const,
      stacked: true, // 누적 바 차트 옵션 활성화
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false, // false면 세로 바 차트
      },
    },
    xaxis: {
      // x축 카테고리 설정
      categories: genderCategories.map((gender) => engToKorGender[gender]),
    },
    legend: {
      position: "bottom" as const, // 범례
    },
  };

  return <Chart options={options} series={series} type="bar" width="500" />;
};
