import { server } from "@/lib/constants";
import { useParams } from "react-router-dom";


function DownloadPage() {
  const { uploadId } = useParams();

  const handleDownload = async () => {
    try {
      const response = await fetch(
        `${server}/download/${uploadId}`,
        {
          method: "GET",
        }
      );

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
      <h2>Download Files</h2>
      <button onClick={handleDownload}>Download File</button>
    </div>
  );
}

export default DownloadPage;

