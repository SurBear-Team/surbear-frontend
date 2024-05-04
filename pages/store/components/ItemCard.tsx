import { motion } from "framer-motion";

interface IItemCard {
  layoutId: string;
  img: string;
  name: string;
  company: string;
  price: number;
  onClick: () => void;
}

export default function ItemCard({
  layoutId,
  img,
  name,
  company,
  price,
  onClick,
}: IItemCard) {
  return (
    <>
      <motion.div
        onClick={onClick}
        layoutId={layoutId}
        className="card bg-white p-4 flex flex-row items-center gap-4 cursor-pointer"
      >
        <div className="w-24 h-24 border border-gray-4 rounded-lg overflow-hidden">
          <img className="w-full" src={img} />
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col">
            <span className="text-base font-semibold text-gray-9">{name}</span>
            <span className="text-xs font-semibold text-gray-5">{company}</span>
          </div>
          <div className="text-gray-9 text-base font-bold">{`${price.toLocaleString()} pt`}</div>
        </div>
      </motion.div>
    </>
  );
}
