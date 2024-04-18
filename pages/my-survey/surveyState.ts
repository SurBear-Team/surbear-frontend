import { atom } from "recoil";

export const newSurveyState = atom({
  key: "newSurveyState",
  default: {
    surveyTitle: "",
    surveyDescription: "",
    surveyCategory: "",
    isPrivate: false,
    maxPerson: "255",
  },
});
