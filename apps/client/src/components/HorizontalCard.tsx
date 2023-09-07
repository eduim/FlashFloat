import React from "react";

interface CardProps {
  children: React.ReactNode;
}

const HorizontalCard: React.FC<CardProps> = ({ children }) => {
  const cardClasses = `bg-neutral-950 bg-opacity-40 text-white  p-8 rounded-lg`;
  const fixedCardStyles = {
    width: "500px", 
    height: "300px", 
  };

  return (
    <div className={cardClasses} style={fixedCardStyles}>
      {children}
    </div>
  );
};

export default HorizontalCard;
