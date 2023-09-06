import React from "react";

interface CardProps {
  children: React.ReactNode;
}

const HorizontalCard: React.FC<CardProps> = ({ children }) => {
  const cardClasses = `bg-black text-white border-2 border-gray-700 p-4`;

  return <div className={cardClasses}>{children}</div>;
};

export default HorizontalCard;
