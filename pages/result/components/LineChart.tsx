import { SurveyData } from "@/pages/edit-survey/editInterface";

interface LineChartProps {
  item: SurveyData;
  surveyResult: { [key: string]: any };
  type: string;
}

export const LineChart = ({ item, surveyResult, type }: LineChartProps) => {
  console.log("아이템", item);
  console.log("서베이결과", surveyResult);
  console.log("타입", type);
  return <></>;
};
