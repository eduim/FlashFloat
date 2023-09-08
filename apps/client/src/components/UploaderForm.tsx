import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { server } from "@/lib/constants";
import { useNavigate } from "react-router-dom";
import LoadingButton from "./ui/LoadingButton";

function UploaderForm() {
  const [emailTo, setEmailTo] = useState("");
  const [yourEmail, setYourEmail] = useState("");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [fileUpload, setFileUpload] = useState<FileList | null>(null);
  const [loading, setLoading] = useState(false);

  const [selectedFileNames, setSelectedFileNames] = useState<string[] | null>(
    null
  );

  const navigate = useNavigate();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFileUpload(event.target.files);

      const fileNames = Array.from(event.target.files).map((file) => file.name);
      setSelectedFileNames(fileNames);
    }
  };

  const handleTransfer = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    const uploadData = new FormData();
    uploadData.append("emailTo", emailTo);
    uploadData.append("yourEmail", yourEmail);
    uploadData.append("title", title);
    uploadData.append("message", message);

    try {
      if (fileUpload) {
        const numberFiles = Object.keys(fileUpload).length;

        const totalSize = fileUpload;

        const uploadResponse = await fetch(`${server}/upload`, {
          method: "POST",
          body: uploadData,
        });

        if (uploadResponse.status === 201) {
          const responseBody = await uploadResponse.json();
          const expiresAt = responseBody.updateUPload.expiresAt;
          console.log("Server Response:", uploadResponse);
          console.log("Server Response:", responseBody);

          setEmailTo("");
          setYourEmail("");
          setTitle("");
          setMessage("");

          navigate("/confirmation", {
            state: {
              emailTo,
              yourEmail,
              title,
              message,
              numberFiles,
              expiresAt: expiresAt || "N/A",
              totalSize,
              selectedFileNames,
            },
          });
        } else {
          console.error("Transfer failed. Status: ", uploadResponse.status);
        }
        setFileUpload(null);
        setSelectedFileNames(null);
      }
    } catch (error) {
      console.error("Transfer failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <form onSubmit={handleTransfer}>
        <div className="mb-4 text-center">
          <label
            htmlFor="fileInput"
            className="bg-zinc-600 text-white py-2 px-4 rounded-full cursor-pointer inline-flex items-center"
            style={{ width: "288px", borderRadius: "50px", height: "64px" }}
          >
            <span style={{ marginLeft: "auto", marginRight: "auto" }}>
              Add Files
            </span>
            <input
              type="file"
              id="fileInput"
              className="hidden"
              multiple
              onChange={handleFileChange}
            />
          </label>
        </div>
        {/* Display selected file names */}
        {selectedFileNames && (
          <div className="mb-4">
            <p className="text-gray-700 font-bold">Selected Files:</p>
            <ul>
              {selectedFileNames.map((fileName, index) => (
                <li key={index}>{fileName}</li>
              ))}
            </ul>
          </div>
        )}
        <div className="mt-16">
          <div className="mb-4">
            <input
              type="text"
              id="emailTo"
              className="border-b border-gray-400 focus:outline-none focus:border-blue-500 bg-transparent w-full"
              value={emailTo}
              onChange={(e) => setEmailTo(e.target.value)}
              placeholder="Email to"
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              id="yourEmail"
              className="border-b border-gray-400 focus:outline-none focus:border-blue-500 bg-transparent w-full"
              value={yourEmail}
              onChange={(e) => setYourEmail(e.target.value)}
              placeholder="Your Email"
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              id="title"
              className="border-b border-gray-400 focus:outline-none focus:border-blue-500 bg-transparent w-full"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              id="message"
              className="border-b border-gray-400 focus:outline-none focus:border-blue-500 bg-transparent w-full"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Message"
            />
          </div>
          {loading ? (
            <LoadingButton />
          ) : (
            <div className="mt-32 text-center">
              <Button
                className="bg-yellow-100 rounded-full py-2 px-6 text-yellow-400 inline-block"
                type="submit"
                style={{ width: "176px", borderRadius: "50px", height: "50px" }}
              >
                Send
              </Button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}

export default UploaderForm;
