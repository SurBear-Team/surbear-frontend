import { TopBar } from "@/pages/components/TopBar/TopBar";
import { TypeDropDown } from "@/pages/my-survey/components/TypeDropDown";
import { useState } from "react";

export default function Result() {
  const filteredList = ["전체", "성별", "나이"];
  const [showFilter, setShowFilter] = useState(false);
  const [filterType, setFilterType] = useState("전체");

  // 전체, 성별, 나이 선택하는 함수
  const handleFilterSelect = (selectedFilterType: string) => {
    setFilterType(selectedFilterType);
    setShowFilter(false);
  };
  return (
    <>
      <TopBar title="설문 결과" hasBack subTitle="임시 타이틀" />
      <div className="white-screen flex-col pt-20 justify-start">
        <div className="inner-screen px-6 py-8">
          {/* 질문 리스트 */}
          <div className="sm-gray-9-text text-base pb-4">질문 제목</div>
          <div className="flex whitespace-nowrap gap-4 pr-2">
            구분
            <TypeDropDown
              onShowTypeClick={() => {
                setShowFilter((prev) => !prev);
              }}
              showType={showFilter}
              typeType={filterType}
              typeList={filteredList}
              onTypeSelect={handleFilterSelect}
            />
          </div>
        </div>
      </div>
    </>
  );
}
