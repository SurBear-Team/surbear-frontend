import Chart from "react-apexcharts";
import { ChartProps } from "./resultInterface";
import { engAgeCategories } from "./categories";

interface ResponseProps {
  questionId: number; // 질문 ID
  request: { answers: string | string[] }; // 응답 내용
}

export const engToKorAge: { [key: string]: string } = {
  UNDER_TWENTY: "20대 미만",
  TWENTIES: "20대",
  THIRTIES: "30대",
  FOURTIES: "40대",
  FIFTIES: "50대",
  OVER_SIXTIES: "60대 이상",
};

export const AgeBarChart = ({ item, surveyResult }: ChartProps) => {
  // 각 설문 옵션에 대한 응답 수를 계산하여 series 데이터 생성
  const series = item.options.map((option) => ({
    name: option.answer, // 각 옵션의 답변 내용
    // 나이별로 응답 수를 계산
    data: engAgeCategories.map((age) => {
      // result 객체는 각 응답자의 응답을 담고 있음
      return Object.values(surveyResult).reduce((total, result) => {
        // 응답자의 나이가 현재 카테고리와 일치할 경우
        if (result.age === age) {
          result.response.forEach((response: ResponseProps) => {
            // 해당 질문에 대한 응답이 현재 옵션의 답변과 일치하는 경우 카운트 증가
            if (
              response.questionId === item.surveyQuestion.id &&
              response.request.answers.includes(option.answer)
            ) {
              total++;
            }
          });
        }
        return total; // 계산된 응답 수 반환
      }, 0); // 초기 값 0
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
      categories: engAgeCategories.map((age) => engToKorAge[age]),
    },
    legend: {
      position: "bottom" as const, // 범례
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
