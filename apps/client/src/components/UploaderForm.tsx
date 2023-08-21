import { useState } from "react";

function UploaderForm() {
  const [emailTo, setEmailTo] = useState<string>("");
  const [yourEmail, setYourEmail] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  // const handleTransfer = async(event: React.ChangeEvent<HTMLInputElement>) => {
  //   event.preventDefault();

  //   try{
  //     const uploadData = await fetch('http://localuser:localhost:8080/upload')
  //   }
  // };
  return (
    <div className="flex flex-col justify-center items-center h-screen ">
      <form className="border p-12 border-cyan-400 rounded-xl">
        <label className="bg-cyan-400 p-1 border rounded-md border-1" htmlFor="">Upload File</label>
        <br />
        <input type="file" />
        <br />
        <br />
        <label>Email to </label>
        <br />
        <input
          type="text"
          name="emailTo"
          value={emailTo}
          onChange={(e) => setEmailTo(e.target.value)}
        />
        <br />
        <label className="p-24">Your Email </label>
        <br />
        <input
          type="text"
          name="YourEmail"
          value={yourEmail}
          onChange={(e) => setYourEmail(e.target.value)}
        />
        <br />
        <label className="p-24">Title </label>
        <br />
        <input
          type="text"
          name="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <label className="p-24">Message </label>
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
