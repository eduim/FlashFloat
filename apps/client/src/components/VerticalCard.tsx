import React from "react";

interface CardProps {
  children: React.ReactNode;
}

const VerticalCard: React.FC<CardProps> = ({ children }) => {
  return <div className="card">{children}</div>;
};

export default VerticalCard;
