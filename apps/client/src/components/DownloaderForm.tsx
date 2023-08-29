import React, { useState } from "react";

function DownloaderForm() {
  const [uploadId, setUploadId] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUploadId(event.target.value);
  };

  const handleDownload = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/download/${uploadId}`,
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
      <label>
        Enter Upload Id:
        <input type="text" value={uploadId} onChange={handleInputChange} />
      </label>
      <button onClick={handleDownload}>Download File</button>
    </div>
  );
}

export default DownloaderForm;
