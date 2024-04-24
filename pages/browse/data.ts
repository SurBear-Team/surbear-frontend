export interface ISurveyList {
  totalPages: number;
  content: ISurvey[];
}

export interface ISurvey {
  id: number;
  ongoingType: string;
  surveyType: string;
  surveyAuthorId: number;
  maximumNumberOfPeople: number;
  title: string;
  description: string;
  point: number;
  openType: boolean;
  deleted: boolean;
  deadLine: string;
  startDate: string;
}

export interface ICategory {
  key: string;
  value: string;
}

export const category: ICategory[] = [
  { key: "ALL", value: "전체" },
  { key: "SOCIAL", value: "사회" },
  { key: "ECONOMY", value: "경제" },
  { key: "LIFE", value: "생활" },
  { key: "HOBBY", value: "취미" },
  { key: "IT", value: "IT" },
  { key: "CULTURE", value: "문화" },
  { key: "EDUCATION", value: "교육" },
  { key: "ETC", value: "기타" },
];

export const orderList = [
  "최신순",
  "높은 포인트순",
  "적은 문항수순",
  "많은 문항수순",
];
