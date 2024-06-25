import React from 'react';
import { motion } from 'framer-motion';

const SongSkeleton = ({ count = 1 }) => {
  const gradientAnimation = {
    animate: {
      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
    },
    transition: {
      duration: 2,
      ease: "linear",
      repeat: Infinity,
    }
  };

  return (
    <>
      {Array.from({ length: count }, (_, index) => (
        <div key={index} className="animate-pulse flex space-x-4 p-4">
          <div className="rounded-full bg-[#282828] h-12 w-12"></div>
          <div className="flex-1 space-y-4 py-1">
            <motion.div
              className="h-4 bg-gradient-to-r from-[#282828] via-[#636363] to-[#282828] rounded w-3/4"
              {...gradientAnimation}
            ></motion.div>
            <div className="space-y-2">
              <motion.div
                className="h-4 bg-gradient-to-r from-[#282828] via-[#636363] to-[#282828] rounded"
                {...gradientAnimation}
              ></motion.div>
              <motion.div
                className="h-4 bg-gradient-to-r from-[#282828] via-[#636363] to-[#282828] rounded w-5/6"
                {...gradientAnimation}
              ></motion.div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default SongSkeleton;