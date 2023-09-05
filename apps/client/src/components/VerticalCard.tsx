import React from "react";

interface CardProps {
  children: React.ReactNode;
  x?: number; // x-coordinate
  y?: number; // y-coordinate
  w?: number; // width
  h?: number; // height
}

const VerticalCard: React.FC<CardProps> = ({ children, x, y, w, h }) => {
  const cardStyle: React.CSSProperties = {
    position: "absolute",
    left: x ? `${x}px` : "0", // Default to 0 if x is not provided
    top: y ? `${y}px` : "0", // Default to 0 if y is not provided
    width: w ? `${w}px` : "100%", // Default to 100% width if w is not provided
    height: h ? `${h}px` : "100%", // Default to 100% height if h is not provided
    background: "black", // Set background color to black
    color: "black", // Set text color to white
    border: "1px solid #ccc", // Example border style
    padding: "16px", // Example padding
  };

  return (
    <div className="card" style={cardStyle}>
      {children}
    </div>
  );
};

export default VerticalCard;
