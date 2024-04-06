// 단답형
interface ShortAnswerProps {}

export const ShortAnswerType = ({}: ShortAnswerProps) => {
  return (
    <div className="flex justify-between gap-2 items-center pt-4">
      <div className="check-box bg-white border-[1px] border-gray-7" />

      <div className="flex justify-between w-full items-center">
        <div className="sm-gray-9-text text-base">최대 글자수 제한</div>
        <input className="w-16 p-2 rounded-lg border-[1px] border-gray-4" />
      </div>
    </div>
  );
};
