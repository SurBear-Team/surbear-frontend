interface ListCardProps {
  getDate: any;
  getWay: string;
  plusMinus: any;
  point: string;
}

export const ListCard = ({
  getDate,
  getWay,
  plusMinus,
  point,
}: ListCardProps) => {
  return (
    <div className="w-full flex justify-between px-6 py-[26px] items-center bg-white border-b-[1px] border-gray-4">
      <div className="text-gray-9 text-sm font-semibold">{getDate}</div>
      <div className="flex items-center gap-8">
        <div className="text-gray-5 text-sm font-semibold">{getWay}</div>
        <div className="text-gray-9 font-semibold">
          {plusMinus}
          {point}
        </div>
      </div>
    </div>
  );
};
