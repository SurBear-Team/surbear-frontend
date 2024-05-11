import { SurveyData } from "@/pages/edit-survey/editInterface";

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

// 차트에 들어가는 인터페이스
export interface ChartProps {
  item: SurveyData; // 설문 데이터
  surveyResult: { [key: string]: SurveyResult }; // 설문 결과 데이터
}
