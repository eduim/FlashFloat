import { useState } from "react";

function UploaderForm() {
  const [formData, setFormData] = useState({
    emailTo: "",
    YourEmail: "",
    Title: "",
    Message: "",
  });
  //WE NEED TO TYPE THE ARGUMENTS
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(event.target.value);
  };
  //WE NEED TO TYPE THE ARGUMENTS
  const handleTransfer = (event) => {
    event.preventDefault();
  };
  return (
    <div>
      <form className="b-2 bg-cyan-400" onSubmit={handleTransfer}>
        <label>Email to </label>
        <input
          type="text"
          name="emailTo"
          value={formData.EmailTo}
          onChange={handleChange}
        />
        <label>Your Email </label>
        <input
          type="text"
          name="YourEmail"
          value={formData.YourEmail}
          onChange={handleChange}
        />
        <label>Title </label>
        <input
          type="text"
          name="Title"
          value={formData.Title}
          onChange={handleChange}
        />
        <label>Message </label>
        <input
          type="text"
          name="Message"
          value={formData.Messager}
          onChange={handleChange}
        />
        <button type="submit">Transfer</button>
      </form>
    </div>
  );
}
export default UploaderForm;
