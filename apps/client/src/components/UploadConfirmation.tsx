import { useLocation } from "react-router-dom";
import { dateFormatter, fileFormatter } from "@/lib/formatter";
import logoBigLight from "../assets/logo big light 1.svg";
import ellipse from "../assets/Ellipse 1.png"

const UploadConfirmation = () => {
  const location = useLocation();
  const { emailTo, title, message, numberFiles, totalSize, expiresAt } =
    location.state || {};
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-1276 h-768 border-4 border-red-700  ">
        <div className="flex w-640 h-384 bg-gray-800 bg-opacity-60 p-4">
          <div>
            <p>Your transfer details</p>
            <p>
              {" "}
              {fileFormatter(totalSize)} .
              {numberFiles === 1
                ? `${numberFiles} File`
                : `${numberFiles} Files`}
              . Expires {dateFormatter(new Date(expiresAt))}
            </p>
            <p>Sending to</p>
            <p>{emailTo}</p>
            <p>Title</p>
            <p>{title}</p>
            <p>Message</p>
            <p>{message}</p>
          </div>
          <div className="flex flex-col items-center justify-center w-448 h-640 bg-gray-800 bg-opacity-90">
            <div>
              <img src={ellipse} alt="" />
            </div>
            <div>
              <p>You are done!</p>
              <a href="/">Send another</a>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center p-4">
          <a href="/">
            <img src={logoBigLight} alt="Logo" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default UploadConfirmation;
