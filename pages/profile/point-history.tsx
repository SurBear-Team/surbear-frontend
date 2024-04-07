import { useRouter } from "next/router";
import { TopBar } from "../components/TopBar";
import { ArrowBackIcon } from "../components/styles/Icons";
import { ListCard } from "./components/ListCard";

export default function PointHistory() {
  const route = useRouter();

  let PointList = ["ex1", "ex2", "ex3", "ex4", "ex5", "ex6"];
  return (
    <>
      <TopBar
        leftSVG={<ArrowBackIcon />}
        onLeftClick={() => {
          route.back();
        }}
        title="현재 포인트 내역"
      />
      <div className="white-screen flex-col pt-[50px] justify-start">
        {PointList.map((index) => (
          <ListCard
            key={index}
            getDate={"2024.03.15"}
            getWay={`설문조사 참여`}
            plusMinus={`+`}
            point={`10pt`}
          />
        ))}
      </div>
    </>
  );
}
