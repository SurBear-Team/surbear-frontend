import Chart from "react-apexcharts";
import { ChartProps } from "./resultInterface";

export const DonutChart = ({ item, surveyResult }: ChartProps) => {
  const series = item.options.map((option) => {
    // reduce로 response를 순회하며 surveyResult에서 해당 답변의 출현 횟수를 계산
    return Object.values(surveyResult).reduce((count, res) => {
      // res는 개별 응답의 상세정보
      res.response?.forEach(
        (response: {
          questionId: number;
          request: { answers: string | string[] };
        }) => {
          if (
            // 각 답변이 현재 옵션의 답변과 일치하는지 검사
            response.questionId === item.surveyQuestion.id &&
            response.request.answers.includes(option.answer)
          ) {
            count++; // 조건에 맞는 응답이면 count +1
          }
        }
      );
      return count;
    }, 0); // 초기값 0
  });

  const options = {
    labels: item.options.map((option) => option.answer),
    legend: {
      show: true, // 범례 표시
      position: "bottom" as const,
    },
    // 반응형 설정
    responsive: [
      {
        breakpoint: 250, // 이 크기 이하의 화면에선 options에 정의된 스타일 적용
        options: {
          chart: {
            width: 200,
          },
          legend: {
            show: false, // 범례
            position: "bottom" as const, // 수정
          },
        },
      },
    ],
  };

  return <Chart options={options} series={series} type="donut" width="380" />;
};
