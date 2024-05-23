interface InquiryCardProps {
  title: string;
  onClick: () => void;
}

export const InquiryCard = ({ title, onClick }: InquiryCardProps) => {
  return (
    <div className="w-full bg-white pl-12 pr-8 py-[27px] flex justify-between">
      <div className="sm-gray-9-text">{title}</div>
      <button onClick={onClick} className="text-red-1 text-sm font-semibold">
        삭제
      </button>
    </div>
  );
};
