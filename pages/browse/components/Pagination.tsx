import { NextPageIcon, PrevPageIcon } from "@/pages/components/styles/Icons";

interface IPagination {
  currentPage: number;
  lastPage: number;
  onPrevClick: () => void;
  onNextClick: () => void;
  onNumClick: (el: number) => void;
}

export default function Pagination({
  currentPage,
  lastPage,
  onPrevClick,
  onNextClick,
  onNumClick,
}: IPagination) {
  const getPages = () => {
    // 최대 페이지 수까지 표시되는 경우
    if (currentPage >= lastPage - 2) {
      const pages = [
        lastPage - 4,
        lastPage - 3,
        lastPage - 2,
        lastPage - 1,
        lastPage,
      ];
      return pages;
    } else {
      const prevPages = [currentPage - 2, currentPage - 1];
      const nextPages = [currentPage + 1, currentPage + 2];
      return [...prevPages, currentPage, ...nextPages];
    }
  };

  return (
    <div className="flex flex-col gap-4 fixed bottom-[97px] z-50 left-1/2 -translate-x-1/2">
      <div className="flex gap-2">
        <div
          onClick={onPrevClick}
          className="w-6 h-6 rounded-full border bg-white border-primary-1 justify-center items-center flex shadow-md cursor-pointer"
        >
          <PrevPageIcon />
        </div>
        {getPages().map((el) =>
          // 페이지에 1보다 작은 수가 있다면 공간만 차지하게 함
          el >= 1 ? (
            <div
              onClick={() => onNumClick(el)}
              className={`w-6 h-6 rounded-full justify-center items-center flex cursor-pointer shadow-md ${
                el === currentPage
                  ? "bg-primary-1 text-white"
                  : "border bg-white border-primary-1 text-primary-1"
              }`}
            >
              <div className="text-xs font-semibold mt-[2px]">{el}</div>
            </div>
          ) : (
            <div className="w-6 h-6 rounded-full justify-center items-center flex" />
          )
        )}

        <div
          onClick={onNextClick}
          className="w-6 h-6 rounded-full border bg-white border-primary-1 justify-center items-center flex shadow-md cursor-pointer"
        >
          <NextPageIcon />
        </div>
      </div>
    </div>
  );
}
