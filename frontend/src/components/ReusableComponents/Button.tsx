import { motion } from "motion/react";

export const Button = ({ children, ...props }: any) => {
  return (
    <motion.button whileTap={{ scale: 0.92 }} {...props}>
      {children}
    </motion.button>
  );
};
