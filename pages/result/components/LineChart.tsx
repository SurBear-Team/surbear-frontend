import { SurveyData } from "@/pages/edit-survey/editInterface";
import Chart from "react-apexcharts";
import { engToKorGender, genderCategories } from "./GenderBarChart";

interface LineChartProps {
  item: SurveyData;
  surveyResult: { [key: string]: any };
}

const ageCategories = [
  "UNDER_TWENTY",
  "TWENTIES",
  "THIRTIES",
  "FOURTIES",
  "FIFTIES",
  "OVER_SIXTIES",
];

const engToKorAge: { [key: string]: string } = {
  UNDER_TWENTY: "20대 미만",
  TWENTIES: "20대",
  THIRTIES: "30대",
  FOURTIES: "40대",
  FIFTIES: "50대",
  OVER_SIXTIES: "60대 이상",
};

const prepareSeriesData = (surveyResult: any, questionId: number) => {
  const resultMap = new Map<string, Map<number, number>>();

  // 각 나이대별로 결과 Map 초기화
  ageCategories.forEach((age) => {
    resultMap.set(age, new Map<number, number>());
  });

  const resultsArray = Array.isArray(surveyResult)
    ? surveyResult
    : Object.values(surveyResult);

  resultsArray.forEach((res: any) => {
    const ageCategory = res.age;
    const ageMap = resultMap.get(ageCategory);
    res.response.forEach((response: any) => {
      if (
        response.questionId === questionId &&
        response.questionType === "SLIDER"
      ) {
        response.request.answers.forEach((answer: string) => {
          const value = parseInt(answer, 10);
          ageMap?.set(value, (ageMap?.get(value) || 0) + 1);
        });
      }
    });
  });

  // 나이대별 series 데이터 생성
  return Array.from(resultMap, ([age, valuesMap]) => ({
    name: engToKorAge[age],
    data: Array.from(valuesMap, ([x, y]) => ({ x, y })).sort(
      (a, b) => a.x - b.x
    ), // 데이터 정렬
  }));
};

export const LineChart = ({ item, surveyResult }: LineChartProps) => {
  const series = prepareSeriesData(surveyResult, item.surveyQuestion.id);

  const options = {
    chart: {
      type: "line",
      group: "age-group", // 시리즈 그룹화
    },
    xaxis: {
      type: "numeric",
      min: 0,
      max: 100,
      tickAmount: 10, // 0부터 100까지 10 단위로 표시
    },
    yaxis: {
      title: {
        text: "응답자 수",
      },
      min: 0,
      max: 5,
    },
    stroke: {
      width: [5, 5, 4],
      curve: "smooth",
    },

    tooltip: {
      x: {
        format: "##",
      },
    },
  };

  return <Chart options={options} series={series} type="line" width="500" />;
};

const prepareGenderSeriesData = (surveyResult: any, questionId: number) => {
  const resultMap = new Map<string, Map<number, number>>();

  // 성별별로 결과 Map 초기화
  genderCategories.forEach((gender) => {
    resultMap.set(gender, new Map<number, number>());
  });

  const resultsArray = Array.isArray(surveyResult)
    ? surveyResult
    : Object.values(surveyResult);

  resultsArray.forEach((res: any) => {
    const genderCategory = res.gender;
    const genderMap = resultMap.get(genderCategory);
    res.response.forEach((response: any) => {
      if (
        response.questionId === questionId &&
        response.questionType === "SLIDER"
      ) {
        response.request.answers.forEach((answer: string) => {
          const value = parseInt(answer, 10);
          genderMap?.set(value, (genderMap?.get(value) || 0) + 1);
        });
      }
    });
  });

  // 성별별 series 데이터 생성
  return Array.from(resultMap, ([gender, valuesMap]) => ({
    name: engToKorGender[gender],
    data: Array.from(valuesMap, ([x, y]) => ({ x, y })).sort(
      (a, b) => a.x - b.x
    ), // 데이터 정렬
  }));
};

export const GenderLineChart = ({ item, surveyResult }: LineChartProps) => {
  const series = prepareGenderSeriesData(surveyResult, item.surveyQuestion.id);

  const options = {
    chart: {
      type: "line",
      group: "gender-group",
    },
    xaxis: {
      type: "numeric",
      min: 0,
      max: 100,
      tickAmount: 10,
    },
    yaxis: {
      title: {
        text: "응답자 수",
      },
      min: 0,
      max: 5,
    },
    tooltip: {
      x: {
        format: "##",
      },
    },
  };

  return <Chart options={options} series={series} type="line" width="500" />;
};
