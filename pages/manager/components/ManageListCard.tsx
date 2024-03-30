export const ManageListCard = ({ date, title, nickname }: any) => {
  return (
    <div className="w-full px-6 flex justify-center items-center bg-white">
      <div className="sm-gray-9-text">{date}</div>
      <div className="text-gray-5 text-sm text-right">{title}</div>
      <div className="sm-gray-9-text text-xs">{nickname}</div>
    </div>
  );
};
