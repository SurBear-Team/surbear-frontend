import { atom } from "recoil";

export const categoryTypeAtom = atom({
  key: "categoryType",
  default: "ALL",
});

export const goodsSearchAtom = atom({
  key: "goodsSearch",
  default: "",
});
