import Image from 'next/image';
import React from 'react';

type CarStatus = 'new' | 'like-new' | 'old';

interface CarStatusBadgeProps {
  type: CarStatus;
}

const CarStatusBadge: React.FC<CarStatusBadgeProps> = ({ type }) => {
  if (type === 'new') {
    return (
      <div className="w-[40px] h-[40px] pointer-events-none">
        <div
          className="w-full h-full bg-[#fe0000] rounded-tl-sm rounded-tr-sm flex items-start justify-end border-b-2 border-l-2 border-white"
          style={{ clipPath: 'polygon(100% 0, 0 0, 100% 100%)' }}
        >
          <span
            className="text-[#ffe600] font-bold text-[11px] tracking-widest drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]"
            style={{ transform: 'rotate(45deg) translate(5px, 4px)' }}
          >
            NEW
          </span>
        </div>
      </div>
    );
  }
  if (type === 'like-new') {
    return (
      <Image
        src="https://media.otozin.vn/check.png"
        alt="check icon"
        width={24}
        height={24}
        className="bg-white/90 backdrop-blur-sm rounded-full p-1 shadow-sm"
      />
    );
  }
  // 'old' hoặc mặc định không render gì
  return null;
};

export default CarStatusBadge; 