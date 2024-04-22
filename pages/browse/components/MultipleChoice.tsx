interface IMultipleChoice {
  index: number;
  title: string;
  selection: string[];
}

export default function MultipleChoice({
  index,
  title,
  selection,
}: IMultipleChoice) {
  return (
    <div className="w-full px-6 py-8 gap-6 flex flex-col">
      <span>{`${index}. ${title}`}</span>
      <div className="flex flex-col gap-4">
        {selection.map((el) => (
          <div className="flex gap-3 p-2 items-center border border-gray-4 rounded-lg">
            <div className="w-4 h-4 border border-gray-7 rounded-[4px]" />
            <span className="flex-grow">{el}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
