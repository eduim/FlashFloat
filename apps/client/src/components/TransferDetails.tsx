import { useLocation, useParams } from "react-router-dom";
import { dateFormatter, fileFormatter } from "@/lib/formatter";
import React, { useEffect, useState } from "react";
import { server } from "@/lib/constants";

interface ITransferDetailsDownload {
  isSender: boolean;
}

const TransferDetailsDownload: React.FC<ITransferDetailsDownload> = ({
  isSender,
}) => {
  const { uploadId } = useParams();
  const location = useLocation();
  // const {
  //   yourEmail,
  //   title,
  //   message,
  //   numberFiles,
  //   totalSize,
  //   expiresAt,
  //   emailTo,
  // } = location.state || {};
  // console.log("in confirmation", { expiresAt });

  const [downloadData, setDownloadData] = useState(null);

  async function downloadMetadata() {
    const response = await fetch(`${server}/download/${uploadId}/metadata`);
    if (!response.ok) {
      // show error
      return;
    }

    const data = await response.json();
    setDownloadData(data);
    console.log({ downloadData: data });
  }

  useEffect(() => {
    console.log({
      location: location.state,
    });
    if (!location.state) {
      downloadMetadata();
    } else {
      setDownloadData(location.state);
    }
  }, []);

  if (!downloadData) {
    return <div>Loading…</div>;
  }

  const {
    yourEmail,
    title,
    message,
    numberFiles,
    totalSize,
    expiresAt,
    emailTo,
  } = downloadData;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Your Transfer Details</h1>

      <p className=" border-b text-gray-300 ">
        {" "}
        {fileFormatter(totalSize)} .
        {numberFiles === 1 ? `${numberFiles} File` : `${numberFiles} Files`}.
        Expires {dateFormatter(new Date(expiresAt))}
      </p>
      <div className="mt-4">
        {isSender ? (
          <div className="mb-4">
            <p className="font-bold">Sending to</p>
            <p>{emailTo}</p>
          </div>
        ) : (
          <div className="mb-4">
            <p>Sent From</p>
            <p>{yourEmail}</p>
          </div>
        )}
        <div className="mb-4">
          <p className="font-bold">Title</p>
          <p>{title}</p>
        </div>
        <div className="mb-4">
          <p className="font-bold">Message</p>
          <p>{message}</p>
        </div>
      </div>
    </div>
  );
};
export default TransferDetailsDownload;
