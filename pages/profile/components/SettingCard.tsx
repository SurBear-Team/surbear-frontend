interface SettingCardProps {
  title: string;
  onClick: () => void;
}

export const SettingCard = ({ title, onClick }: SettingCardProps) => {
  return (
    <div
      onClick={onClick}
      className="w-full bg-white pl-[46px] py-[27px] text-gray-9 text-sm cursor-pointer"
    >
      {title}
    </div>
  );
};
