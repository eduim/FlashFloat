import { useLocation } from "react-router-dom";
import { dateFormatter, fileFormatter } from "@/lib/formatter";
import React from "react";

interface ITransferDetailsDownload {
  isSender: boolean;
}

const TransferDetailsDownload: React.FC<ITransferDetailsDownload> = ({
  isSender,
}) => {
  const location = useLocation();
  const {
    yourEmail,
    title,
    message,
    numberFiles,
    totalSize,
    expiresAt,
    emailTo,
  } = location.state || {};
  return (
    <div>
      <p>Your transfer details</p>
      <p>
        {" "}
        {fileFormatter(totalSize)} .
        {numberFiles === 1 ? `${numberFiles} File` : `${numberFiles} Files`}.
        Expires {dateFormatter(new Date(expiresAt))}
      </p>
      {isSender ? (
        <>
          <p>Sending to</p>
          <p>{emailTo}</p>
        </>
      ) : (
        <>
          <p>Sent From</p>
          <p>{yourEmail}</p>
        </>
      )}
      <p>Title</p>
      <p>{title}</p>
      <p>Message</p>
      <p>{message}</p>
    </div>
  );
};
export default TransferDetailsDownload;
