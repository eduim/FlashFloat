import React from "react";

interface CardProps {
  children: React.ReactNode;
  w?: string;
  h?: string;
}

const VerticalCard: React.FC<CardProps> = ({
  children,
  w = "w-1/5", // Adjust the width for vertical card
  h = "h-100",
}) => {
  const cardClasses = `bg-black text-white border-2 border-gray-700 p-4 ${w} ${h} ml-auto`;

  return <div className={cardClasses}>{children}</div>;
};

export default VerticalCard;
