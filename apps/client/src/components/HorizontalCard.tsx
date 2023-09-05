import React from "react";

interface CardProps {
  children: React.ReactNode;
}

const HorizontalCard: React.FC<CardProps> = ({ children }) => {
  return <div className="card">{children}</div>;
};

export default HorizontalCard;
