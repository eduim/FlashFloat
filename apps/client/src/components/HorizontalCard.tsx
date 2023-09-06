import React from "react";

interface CardProps {
  children: React.ReactNode;
  w?: string;
  h?: string;
}

const HorizontalCard: React.FC<CardProps> = ({
  children,
  w = "w-4/5", // Adjust the width for horizontal card
  h = "h-100",
}) => {
  const cardClasses = `bg-black text-white border-2 border-gray-700 p-4 ${w} ${h}`;

  return <div className={cardClasses}>{children}</div>;
};

export default HorizontalCard;
