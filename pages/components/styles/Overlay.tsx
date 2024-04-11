import { motion } from "framer-motion";

export const Overlay = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="z-50 top-0 left-0 bg-gray-7 bg-opacity-30 fixed w-screen h-screen"
    />
  );
};
