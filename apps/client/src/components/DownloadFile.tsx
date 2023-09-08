import { server } from "@/lib/constants";
import { useParams } from "react-router-dom";
import ellipse from "../assets/Ellipse 1.png";
import downloadImage from "../assets/plus 1.png";

function DownloadFile() {
  const { uploadId } = useParams();

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

  const containerStyles = {
    marginTop: "-40px",
  };
  return (
    <div
      className="flex flex-col items-center justify-center h-full mt-8"
      style={containerStyles}
    >
      <div>
        <img src={ellipse} alt="" className="w-32 h-32" />
      </div>
      <div>
        <h2 className="mt-8 text-white">Transfer Expires in 1 week</h2>
        <button
          className="flex justify-center items-center p-5 bg-yellow-200 rounded-xl text-sm mt-10 "
          onClick={handleDownload}
        >
          {" "}
          <img
            src={downloadImage}
            alt="download Image"
            className="w-4 h-4 mr-1"
          />
          Download File
        </button>
      </div>
    </div>
  );
}

export default DownloadFile;
