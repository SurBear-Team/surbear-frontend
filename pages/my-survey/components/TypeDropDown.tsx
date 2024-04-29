import { TriangleDownIcon } from "@/pages/components/styles/Icons";

interface TypeDropDownProps {
  onShowTypeClick: () => void;
  showType: boolean;
  typeType: string;
  typeList: string[];
  onTypeSelect: (selectedType: string) => void;
}

export const TypeDropDown = ({
  onShowTypeClick,
  showType,
  typeType,
  typeList,
  onTypeSelect,
}: TypeDropDownProps) => {
  return (
    <>
      <div
        onClick={onShowTypeClick}
        className="drop-down-bar relative flex cursor-pointer"
      >
        <div className="sm-gray-9-text text-center w-full">{typeType}</div>
        <TriangleDownIcon />
        {showType && (
          <div className="left-0 top-full sm-gray-9-text text-center w-full absolute rounded border-[1px] border-gray-4 bg-white">
            {typeList?.map((data, index) => (
              <div
                key={index}
                className="py-2 border-t-[1px] border-gray-4"
                onClick={(e) => {
                  e.stopPropagation();
                  onTypeSelect && onTypeSelect(data);
                }}
              >
                {data}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};
