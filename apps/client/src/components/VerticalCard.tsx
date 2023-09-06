import React from "react";

interface CardProps {
  children: React.ReactNode;
  classes?: string;
}

const VerticalCard: React.FC<CardProps> = ({ children, classes }) => {
  const cardClasses = `bg-black text-black border-2 border-gray-700 p-4 bg-opacity-60`;

  return <div className={`${cardClasses} ${classes}`}>{children}</div>;
};

export default VerticalCard;
