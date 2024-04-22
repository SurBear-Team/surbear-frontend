export interface ISurvey {
  id: number;
  ongoingType: string;
  surveyType:
    | "ALL"
    | "SOCIAL"
    | "ECONOMY"
    | "LIFE"
    | "HOBBY"
    | "IT"
    | "CULTURE"
    | "ETC";
  surveyAuthorId: string;
  maximumNumberOfPeople: number;
  title: string;
  description: string;
  point: number;
  openType: boolean;
  deleted: boolean;
  deadLine: string;
}

export const category = {
  ALL: "전체",
  SOCIAL: "사회",
  ECONOMY: "경제",
  LIFE: "생활",
  HOBBY: "취미",
  IT: "IT",
  CULTURE: "문화",
  ETC: "기타",
};

export const orderList = [
  "최신순",
  "높은 포인트순",
  "적은 문항수순",
  "많은 문항수순",
];
