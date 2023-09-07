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

  return (
    <div>
      <div>
        <div className="flex flex-col items-center justify-center w-448 h-640 bg-gray-800 bg-opacity-90">
          <div>
            <img src={ellipse} alt="" />
          </div>
          <div>
            <h2>Download Files</h2>
            <button
              className="flex justify-center items-center p-2 bg-yellow-200 rounded-3xl"
              onClick={handleDownload}
            >
              {" "}
              <img src={downloadImage} alt="download Image" />
              Download File
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DownloadFile;
