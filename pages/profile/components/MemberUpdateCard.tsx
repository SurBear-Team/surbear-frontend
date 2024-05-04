// 회원 정보 수정 페이지에 들어가는 카드

interface MemberUpdateCardProps {
  title: string;
  content: string;
  onClick: () => void;
  hasEdit?: boolean;
}

export const MemberUpdateCard = ({
  title,
  content,
  onClick,
  hasEdit,
}: MemberUpdateCardProps) => {
  return (
    <div className="w-full bg-white pl-12 pr-8 py-[27px] flex justify-between">
      <div className="sm-gray-9-text">
        {title} : {content}
      </div>
      {hasEdit && (
        <button
          onClick={onClick}
          className="text-primary-1 text-sm font-semibold"
        >
          수정
        </button>
      )}
    </div>
  );
};
