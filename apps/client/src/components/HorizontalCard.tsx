import React from "react";

interface CardProps {
  children: React.ReactNode;
}

const HorizontalCard: React.FC<CardProps> = ({ children }) => {
  const cardClasses = `bg-gray-900  text-white  p-8`;

  return <div className={cardClasses}>{children}</div>;
};

export default HorizontalCard;
