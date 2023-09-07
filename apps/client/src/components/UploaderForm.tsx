import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { server } from "@/lib/constants";
import { useNavigate } from "react-router-dom";
import LoadingButton from "./ui/LoadingButton";

function UploaderForm() {
  const [emailTo, setEmailTo] = useState<string>("");
  const [yourEmail, setYourEmail] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [fileUpload, setFileUpload] = useState<FileList | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFileUpload(event.target.files);
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

        let totalSize = 0;

        Array.from(fileUpload).forEach((file) => {
          uploadData.append("fileUpload", file);
          totalSize += file.size;
        });

        const uploadResponse = await fetch(`${server}/upload`, {
          method: "POST",
          body: uploadData,
        });

        const responseBody = await uploadResponse.json();

        const expiresAt = new Date(responseBody.updateUPload.expiresAt);

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
            },
          });
        }
        setFileUpload(null);
      }
    } catch (error) {
      console.error("Transfer failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleTransfer}>
        <Label htmlFor="">Upload File</Label>

        <Input
          type="file"
          name="fileUpload"
          multiple
          onChange={handleFileChange}
        />
        <Label>Email to</Label>

        <Input
          type="text"
          name="emailTo"
          value={emailTo}
          onChange={(e) => setEmailTo(e.target.value)}
        />
        <br />
        <Label>Your Email</Label>
        <br />
        <Input
          type="text"
          name="YourEmail"
          value={yourEmail}
          onChange={(e) => setYourEmail(e.target.value)}
        />
        <br />
        <Label>Title</Label>
        <br />
        <Input
          type="text"
          name="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <Label>Message</Label>
        <br />
        <Input
          type="text"
          name="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <br />
        {loading ? ( <LoadingButton />
          
        ) : (
          <Button
            className="bg-slate-600 rounded-md py-1 px-4 text-white"
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
