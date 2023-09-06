import { server } from "@/lib/constants";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { dateFormatter, fileFormatter } from "@/lib/formatter";
import ellipse from "../assets/Ellipse 1.png";

function DownloadPage() {
  const { uploadId } = useParams();
  const location = useLocation();
  const { yourEmail, title, message, numberFiles, totalSize, expiresAt } =
    location.state || {};

  const handleDownload = async () => {
    try {
      const response = await fetch(`${server}/download/${uploadId}`, {
        method: "GET",
      });

      if (response.ok) {
        const blob = await response.blob();

        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${uploadId}.zip`;
        a.click();
        URL.revokeObjectURL(url);
      } else {
        console.error("Error downloading file");
      }
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  return (
    <div>
      <div>
        <div>
          <p>Your transfer details</p>
          <p>
            {" "}
            {fileFormatter(totalSize)} .
            {numberFiles === 1 ? `${numberFiles} File` : `${numberFiles} Files`}
            . Expires {dateFormatter(new Date(expiresAt))}
          </p>
          <p>Sent From</p>
          <p>{yourEmail}</p>
          <p>Title</p>
          <p>{title}</p>
          <p>Message</p>
          <p>{message}</p>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center w-448 h-640 bg-gray-800 bg-opacity-90">
        <div>
          <img src={ellipse} alt="" />
        </div>
        <div>
          <h2>Download Files</h2>
          <button onClick={handleDownload}>Download File</button>
        </div>
      </div>
    </div>
  );
}

export default DownloadPage;
