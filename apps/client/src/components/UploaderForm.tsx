import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
    try {
      if (fileUpload) {
        uploadData.append("fileUpload", fileUpload);
        console.log("here");
        const uploadResponse = await fetch("http://localhost:8080/upload", {
          method: "POST",
          body: uploadData,
        });
        if (uploadResponse.status === 200) {
          console.log("Your upload has been sent");
        }
      }
    } catch (error) {
      console.error("Transfer failed");
    }
  };

  return (
    <div className="">
      <form
        className="flex flex-col gap-5 justify-center items-center h-screen max-w-md border p-12 black rounded-xl"
        onSubmit={handleTransfer}
      >
        <Label htmlFor="">Upload File</Label>

        <Input type="file" name="fileUpload" onChange={handleFileChange} />
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
        <Button
          className="bg-slate-600 rounded-md py-1 px-4 text-white"
          type="submit"
        >
          Transfer
        </Button>
      </form>
    </div>
  );
}

export default UploaderForm;
