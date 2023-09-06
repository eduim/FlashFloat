import React from "react";

interface CardProps {
  children?: React.ReactNode;
  x?: number;
  y?: number;
  w?: number;
  h?: number;
  numberOfFiles?: number;
  fileSize?: string;
  expiryDate?: string;
  recipientEmail?: string;
  fileTitle?: string;
  senderMessage?: string;
}

const HorizontalCard: React.FC<CardProps> = ({
  x,
  y,
  w,
  h,
  numberOfFiles = 1,
  fileSize = "0KB",
  expiryDate = "Expires in one week",
  recipientEmail = "",
  fileTitle = "",
  senderMessage = "",
}) => {
  const cardStyle: React.CSSProperties = {
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    left: x ? `${x}px` : "0",
    top: "50%", // Center vertically
    transform: "translateY(-50%)", // Adjust for card's height
    width: w ? `${w}px` : "1276px",
    height: h ? `${h}px` : "690px",
    background: "#323232",
    color: "white",
    border: "1px solid #808080",
    borderRadius: "8px",
    padding: "16px",
  };

  const labelStyle: React.CSSProperties = {
    fontWeight: "bold",
    marginBottom: "8px",
  };

  const valueStyle: React.CSSProperties = {
    marginBottom: "16px",
  };

  const contentStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
  };

  const fileInfoStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "space-between",
  };

  const bigTextStyle: React.CSSProperties = {
    fontSize: "24px",
    fontWeight: "bold",
  };

  const smallTextStyle: React.CSSProperties = {
    fontSize: "12px",
  };

  return (
    <div className="horizontal-card" style={cardStyle}>
      <div style={contentStyle}>
        <div style={bigTextStyle}>Your transfer details</div>
        <div style={fileInfoStyle}>
          <span style={smallTextStyle}>{numberOfFiles} file</span>
          <span style={smallTextStyle}>{fileSize}</span>
          <span style={smallTextStyle}>{expiryDate}</span>
        </div>

        {}
        <div style={labelStyle}>Sending to</div>
        <div style={valueStyle}>{recipientEmail}</div>

        <div style={labelStyle}>Title</div>
        <div style={valueStyle}>{fileTitle}</div>

        <div style={labelStyle}>Message</div>
        <div>{senderMessage}</div>
      </div>
    </div>
  );
};

export default HorizontalCard;
