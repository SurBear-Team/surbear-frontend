import { TopBar } from "../components/TopBar";
import { SearchIcon } from "../components/styles/Icons";

export default function Explore() {
  return (
    <>
      <TopBar title="설문 둘러보기" rightSVG={<SearchIcon />} />
      <div className="text-white">
        <div className="screen"></div>
      </div>
    </>
  );
}
