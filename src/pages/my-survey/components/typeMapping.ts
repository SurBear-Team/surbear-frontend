// 한글-영어 매핑하기
export const korToEngTypeMapping: { [key: string]: string } = {
  "객관식 - 단일 선택": "SINGLE_CHOICE",
  "객관식 - 다중 선택": "MULTIPLE_CHOICE",
  단답형: "SHORT_ANSWER",
  슬라이더: "SLIDER",
  주관식: "SUBJECTIVE",
};

// 영어 - 한글 매핑하기
export const engToKorTypeMapping: { [key: string]: string } = {
  SINGLE_CHOICE: "객관식 - 단일 선택",
  MULTIPLE_CHOICE: "객관식 - 다중 선택",
  SHORT_ANSWER: "단답형",
  SLIDER: "슬라이더",
  SUBJECTIVE: "주관식",
};
