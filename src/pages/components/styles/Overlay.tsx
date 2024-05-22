import { motion } from "framer-motion";

interface IOverlay {
  onClick: () => void;
}

export const Overlay = ({ onClick }: IOverlay) => {
  return (
    <motion.div
      onClick={onClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="z-40 top-0 left-0 bg-gray-7 bg-opacity-30 fixed w-screen h-screen"
    />
  );
};
