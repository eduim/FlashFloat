import ellipse from "../assets/Ellipse 1.png";

const SendAnotherFile = () => {
  const containerStyles = {
    marginTop: "-40px",
  };
  return (
    <div
      className="flex flex-col items-center justify-center h-full mt-8"
      style={containerStyles}
    >
      {" "}
      <div className="mb-4 p-0">
        <img src={ellipse} alt="Ellipse" className="w-32 h-32" />{" "}
      </div>
      <p className="mb-4 text-xl text-white">You are done!</p>{" "}
      <a href="/" className="text-xl text-gray-500 underline">
        Send another?
      </a>{" "}
    </div>
  );
};

export default SendAnotherFile;
