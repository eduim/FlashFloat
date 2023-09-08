import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { server } from "@/lib/constants";
import { useNavigate } from "react-router-dom";
import LoadingButton from "./ui/LoadingButton";

function UploaderForm() {
  // State variables
  const [emailTo, setEmailTo] = useState<string>("");
  const [yourEmail, setYourEmail] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [fileUpload, setFileUpload] = useState<FileList | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Selected file names state
  const [selectedFileNames, setSelectedFileNames] = useState<string[] | null>(
    null
  );

  // React Router navigation hook
  const navigate = useNavigate();

  // Function to handle file input change
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      // Set the selected files in state
      setFileUpload(event.target.files);

      // Extract the file names and store them in state
      const fileNames = Array.from(event.target.files).map((file) => file.name);
      setSelectedFileNames(fileNames);
    }
  };

  // Function to handle the transfer when the form is submitted
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

        let totalSize = 0;

        Array.from(fileUpload).forEach((file) => {
          uploadData.append("fileUpload", file);
          totalSize += file.size;
        });

        // Send the file upload request to the server
        const uploadResponse = await fetch(`${server}/upload`, {
          method: "POST",
          body: uploadData,
        });

        const responseBody = await uploadResponse.json();

        const expiresAt = new Date(responseBody.updateUPload.expiresAt);

        // Reset form fields and navigate to confirmation page
        setEmailTo("");
        setYourEmail("");
        setTitle("");
        setMessage("");
        if (uploadResponse.status === 201) {
          navigate("/confirmation", {
            state: {
              emailTo,
              yourEmail,
              title,
              message,
              numberFiles,
              expiresAt,
              totalSize,
              selectedFileNames, // Pass selected file names to the confirmation page
            },
          });
        }
        setFileUpload(null);
        setSelectedFileNames(null); // Reset selected file names
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
        <div className="mb-4">
          <label
            htmlFor="fileInput"
            className="block text-gray-700 font-bold mb-2"
          >
            Add files
          </label>
          <label
            htmlFor="fileInput"
            className="bg-blue-500 text-white py-2 px-4 rounded-full cursor-pointer block"
          >
            Add File
            <input
              type="file"
              id="fileInput"
              className="hidden"
              multiple // This allows multiple file selection
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
        <div className="mb-4">
          <label
            htmlFor="emailTo"
            className="block text-gray-700 font-bold mb-2"
          >
            Email to
          </label>
          <input
            type="text"
            id="emailTo"
            className="border-b border-gray-400 focus:outline-none focus:border-blue-500 bg-transparent w-full"
            value={emailTo}
            onChange={(e) => setEmailTo(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="yourEmail"
            className="block text-gray-700 font-bold mb-2"
          >
            Your Email
          </label>
          <input
            type="text"
            id="yourEmail"
            className="border-b border-gray-400 focus:outline-none focus:border-blue-500 bg-transparent w-full"
            value={yourEmail}
            onChange={(e) => setYourEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            className="border-b border-gray-400 focus:outline-none focus:border-blue-500 bg-transparent w-full"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="message"
            className="block text-gray-700 font-bold mb-2"
          >
            Message
          </label>
          <input
            type="text"
            id="message"
            className="border-b border-gray-400 focus:outline-none focus:border-blue-500 bg-transparent w-full"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        {loading ? (
          <LoadingButton />
        ) : (
          <Button
            className="bg-slate-600 rounded-md py-2 px-6 text-white w-full"
            type="submit"
          >
            Transfer
          </Button>
        )}
      </form>
    </div>
  );
}

export default UploaderForm;
