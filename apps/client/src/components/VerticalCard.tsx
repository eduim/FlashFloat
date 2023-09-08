import React from "react";

interface CardProps {
  children: React.ReactNode;
  classes?: string;
}

const VerticalCard: React.FC<CardProps> = ({ children, classes }) => {
  const cardClasses = `bg-zinc-950 p-8 bg-opacity-60 rounded-lg`;

  const fixedCardStyles = {
    width: "440px",
    height: "640px",
  };
  return (
    <div className={`${cardClasses} ${classes}`} style={fixedCardStyles}>
      {children}
    </div>
  );
};

export default VerticalCard;
