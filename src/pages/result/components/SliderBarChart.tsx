import dynamic from "next/dynamic";
import { engToKorAge } from "./AgeBarChart";
import { engToKorGender } from "./GenderBarChart";
import { engAgeCategories, engGenderCategories } from "./categories";
import { ChartProps, SurveyResponseDetail } from "./resultInterface";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const colors = [
  "#FF5733",
  "#ff0000",
  "#0066ff",
  "#00ff00",
  "#ceb083",
  "#00cca0",
  "#7B33FF",
  "#ff0088",
  "#707070",
  "#d1db47",
  "#303030",
];

export const SliderAgeBarChart = ({ item, surveyResult }: ChartProps) => {
  // 응답 수치별로 시리즈 데이터를 생성하기 위해 11개의 요소를 가진 배열을 생성 초기화
  const series = Array(11)
    .fill(null)
    .map((_, index) => ({
      name: `${index * 10}%`, // 각 응답 수치
      // 각 나이 카테고리별로 데이터를 계산
      data: engAgeCategories.map((age) => {
        // surveyResult 객체에서 모든 결과를 순회하며 해당 나이 카테고리와 일치하는 데이터의 총합을 계산
        return Object.values(surveyResult).reduce((total, result) => {
          if (result.age === age && result.response) {
            result.response.forEach((response: SurveyResponseDetail) => {
              if (
                response.questionId === item.surveyQuestion.id &&
                response.questionType === "SLIDER" &&
                response.request.answers[0] === `${index * 10}`
              ) {
                total++; // 위 조건에 해당하면 total + 1
              }
            });
          }
          return total;
        }, 0); // reduce 초기값은 0
      }),
    }));

  const options = {
    chart: {
      type: "bar" as const,
      stacked: true,
      toolbar: {
        show: false,
      },
    },
    colors: colors,
    plotOptions: {
      bar: {
        horizontal: false,
      },
    },
    xaxis: {
      categories: engAgeCategories.map((age) => engToKorAge[age]),
    },
    yaxis: {
      labels: {
        formatter: (value: number) => Math.floor(value).toString(), // y축 레이블을 정수로 표시
      },
      tickAmount: 5,
    },
    legend: {
      position: "bottom" as const,
    },
    responsive: [
      {
        breakpoint: 435, // 이 크기 이하의 화면에선 options에 정의된 스타일 적용
        options: {
          chart: {
            width: 350,
            height: 500,
          },
          legend: {
            show: false, // 범례
          },
        },
      },
    ],
  };

  return <Chart options={options} series={series} type="bar" width="500" />;
};

export const SliderGenderBarChart = ({ item, surveyResult }: ChartProps) => {
  const series = Array(11)
    .fill(null)
    .map((_, index) => ({
      name: `${index * 10}%`,
      data: engGenderCategories.map((gender) => {
        return Object.values(surveyResult).reduce((total, result) => {
          if (result.gender === gender && result.gender) {
            result.response.forEach((response: SurveyResponseDetail) => {
              if (
                response.questionId === item.surveyQuestion.id &&
                response.questionType === "SLIDER" &&
                response.request.answers[0] === `${index * 10}`
              ) {
                total++;
              }
            });
          }
          return total;
        }, 0);
      }),
    }));

  const options = {
    chart: {
      type: "bar" as const,
      stacked: true,
      toolbar: {
        show: false,
      },
    },
    colors: colors,
    plotOptions: {
      bar: {
        horizontal: false,
      },
    },
    xaxis: {
      categories: engGenderCategories.map((gender) => engToKorGender[gender]),
    },
    yaxis: {
      labels: {
        formatter: (value: number) => Math.floor(value).toString(),
      },
      tickAmount: 5,
    },
    legend: {
      position: "bottom" as const,
    },
    responsive: [
      {
        breakpoint: 435, // 이 크기 이하의 화면에선 options에 정의된 스타일 적용
        options: {
          chart: {
            width: 350,
            height: 500,
          },
          legend: {
            show: false, // 범례
          },
        },
      },
    ],
  };

  return <Chart options={options} series={series} type="bar" width="500" />;
};
