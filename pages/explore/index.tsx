import { TopBar } from "../components/TopBar";
import { SearchIcon } from "../components/styles/Icons";

export default function Explore() {
  return (
    <>
      <TopBar
        title="설문 둘러보기"
        rightSVG={<SearchIcon />}
        hasSubTopBar={true}
        subTitle={`내 포인트 : ${1} pt`} // 이건 임시
        hasFilter={true}
        onFilterClick={() => {
          console.log("필터 클릭");
        }}
        hasOrder={true}
        onOrderClick={() => {
          console.log("정렬 클릭");
        }}
        orderType="최신순"
      />
      <div className="text-white">
        <div className="screen">
          <div className="bg-gray-1 w-full h-screen">
            <div>뭐시깽이</div>
          </div>
        </div>
      </div>
    </>
  );
}
