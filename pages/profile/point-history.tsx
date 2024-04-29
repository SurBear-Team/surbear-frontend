import { useRouter } from "next/router";
import { ArrowBackIcon } from "../components/styles/Icons";
import { ListCard } from "./components/ListCard";
import { TopBar } from "../components/TopBar/TopBar";

export default function PointHistory() {
  const route = useRouter();

  let PointList = ["ex1", "ex2", "ex3", "ex4", "ex5", "ex6"];
  return (
    <>
      <TopBar hasBack noShadow title="현재 포인트 내역" />
      <div className="white-screen flex-col pt-[50px] justify-start">
        <div className="inner-screen">
          {PointList.map((index) => (
            <ListCard
              key={index}
              getTime={"2024.03.15"}
              getWay={`설문조사 참여`}
              plusMinus={`+`}
              point={`10pt`}
            />
          ))}
        </div>
      </div>
    </>
  );
}
