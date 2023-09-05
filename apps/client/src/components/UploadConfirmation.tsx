import { useLocation } from "react-router-dom";
import { dateFormatter, fileFormatter } from "@/lib/formatter";

const UploadConfirmation = () => {
  const location = useLocation();
  const { yourEmail, title, message, numberFiles, totalSize, expiresAt } =
    location.state || {};
  return (
    <div className="w-640 h-384 bg-gray-800 bg-opacity-60">
      <div>
        <p>Your transfer details</p>
        <p>
          {" "}
          {fileFormatter(totalSize)} .
          {numberFiles === 1 ? `${numberFiles} File` : `${numberFiles} Files`}.
          Expires {dateFormatter(new Date(expiresAt))}
        </p>
        <p>Sending to</p>
        <p>{yourEmail}</p>
        <p>Title</p>
        <p>{title}</p>
        <p>Message</p>
        <p>{message}</p>
      </div>
      <div className="absolute w-448 h-640 bg-gray-800 bg-opacity-90">
        <p>You are done!</p>
        <a href="/">Send another</a>
      </div>
    </div>
  );
};

export default UploadConfirmation;
