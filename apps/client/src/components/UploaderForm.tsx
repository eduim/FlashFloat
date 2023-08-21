import React, { useState, useEffect } from "react";

function UploaderForm() {
  const [emailTo, setEmailTo] = useState<string>("");
  const [yourEmail, setYourEmail] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const [fetchedData, setFetchedData] = useState<any>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts/1"
        );
        const data = await response.json();
        setFetchedData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  const handleTransfer = async (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    // Your transfer logic here
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <form className="border p-12 border-cyan-400 rounded-xl">
        <label className="bg-cyan-400 p-1 border rounded-md border-1">
          Upload File
        </label>
        <br />
        <input type="file" />
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
          onClick={handleTransfer}
        >
          Transfer
        </button>
      </form>

      {fetchedData && (
        <div className="mt-4">
          <h2>Fetched Data</h2>
          <pre>{JSON.stringify(fetchedData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default UploaderForm;
