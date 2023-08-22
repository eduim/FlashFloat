import React, { useState } from "react";

function UploaderForm() {
  const [emailTo, setEmailTo] = useState<string>("");
  const [yourEmail, setYourEmail] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [fileUpload, setFileUpload] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFileUpload(event.target.files[0]);
    }
  };
  const handleTransfer = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    const uploadData = new FormData();
    uploadData.append("emailTo", emailTo);
    uploadData.append("yourEmail", yourEmail);
    uploadData.append("title", title);
    uploadData.append("message", message);
    if (fileUpload) {
      uploadData.append("fileUpload", fileUpload);
    }

    try {
      const uploadResponse = await fetch(
        "http://localuser:localhost:8080/upload",
        {
          method: "POST",
          body: uploadData,
        }
      );
      if (uploadResponse.status === 200) {
        console.log("Your upload has been sent");
      }
    } catch (error) {
      console.error("Transfer failed");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen ">
      <form
        className="border p-12 border-cyan-400 rounded-xl"
        onSubmit={handleTransfer}
      >
        <label
          className="bg-cyan-400 px-3 py-2 mb-6 border rounded-md border-black border-1 "
          htmlFor=""
        >
          Upload File
        </label>
        <br />
        <input type="file" name="fileUpload" onChange={handleFileChange} />
        <br />
        <br />
        <label>Email to</label>
        <br />
        <input
          type="text"
          name="emailTo"
          value={emailTo}
          onChange={(e) => setEmailTo(e.target.value)}
        />
        <br />
        <label>Your Email</label>
        <br />
        <input
          type="text"
          name="YourEmail"
          value={yourEmail}
          onChange={(e) => setYourEmail(e.target.value)}
        />
        <br />
        <label>Title</label>
        <br />
        <input
          type="text"
          name="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <label>Message</label>
        <br />
        <input
          type="text"
          name="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <br />
        <button
          className="bg-slate-600 rounded-md py-1 px-4 text-white"
          type="submit"
        >
          Transfer
        </button>
      </form>
    </div>
  );
}

export default UploaderForm;
