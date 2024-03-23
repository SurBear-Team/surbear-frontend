interface ProfileCardProps {
  title: string;
  content: string;
  onClick: () => void;
}

export const ProfileCard = ({ title, content, onClick }: ProfileCardProps) => {
  return (
    <>
      <div className="profile-card">
        <div className="flex flex-col gap-2 w-full">
          <div className="text-gray-6 text-sm font-bold whitespace-nowrap">
            {title}
          </div>
          <div className="font-bold">{content}</div>
        </div>
        <button
          onClick={onClick}
          className="medium-Btn w-full border-primary-1 bg-primary-1 text-white px-0"
        >
          내역 보기
        </button>
      </div>
    </>
  );
};
