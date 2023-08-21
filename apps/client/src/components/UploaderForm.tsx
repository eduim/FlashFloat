import { useState } from "react";

function UploaderForm() {
  const [emailTo, setEmailTo] = useState<string>("");
  const [yourEmail, setYourEmail] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const handleTransfer = async(event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    try{
      const uploadData = await fetch('http://localuser:localhost:8080/upload')
    }
  };
  return (
    <div>
      <form className="b-2 bg-cyan-400" onSubmit={handleTransfer}>
        <label>Email to </label>
        <input
          type="text"
          name="emailTo"
          value={emailTo}
          onChange={(e) => setEmailTo(e.target.value)}
        />
        <label>Your Email </label>
        <input
          type="text"
          name="YourEmail"
          value={yourEmail}
          onChange={(e) => setYourEmail(e.target.value)}
        />
        <label>Title </label>
        <input
          type="text"
          name="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Message </label>
        <input
          type="text"
          name="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit">Transfer</button>
      </form>
    </div>
  );
}
export default UploaderForm;
