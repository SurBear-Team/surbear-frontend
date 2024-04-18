import { atom } from "recoil";

export const newSurveyState = atom({
  key: "newSurveyState",
  default: {
    surveyTitle: "",
  },
});
