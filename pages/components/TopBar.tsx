interface TopBarProps {
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  leftSVG?: React.ReactNode;
}

export const TopBar: React.FC<TopBarProps> = ({ onClick, leftSVG }) => {
  return (
    <div className="bg-white fixed w-full">
      <div className="flex gap-2 pl-6 py-3 ">
        <div onClick={onClick}>{leftSVG}</div>
        <div className="font-extrabold">회원가입</div>
      </div>
    </div>
  );
};
