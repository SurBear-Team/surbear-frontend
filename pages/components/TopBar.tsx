interface TopBarProps {
  onClick: React.MouseEventHandler<HTMLDivElement>;
}

export const TopBar: React.FC<TopBarProps> = ({ onClick }) => {
  return (
    <div className="bg-white fixed">
      <div className="flex gap-2 pl-6 py-3 ">
        <div onClick={onClick}>⬅</div>
        <div className="font-extrabold">회원가입</div>
      </div>
    </div>
  );
};
