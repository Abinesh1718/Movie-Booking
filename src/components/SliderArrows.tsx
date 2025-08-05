import React from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface ArrowProps {
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}


// handle Previous slieds
export const PrevArrow: React.FC<ArrowProps> = ({ className, onClick }) => (
  <div className={`${className} custom-arrow prev`} onClick={onClick}>
    <FaChevronLeft />
  </div>
);
// handle Next slieds

export const NextArrow: React.FC<ArrowProps> = ({ className, onClick }) => (
  <div className={`${className} custom-arrow next`} onClick={onClick}>
    <FaChevronRight />
  </div>
);
