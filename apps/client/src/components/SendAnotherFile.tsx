import logoBigLight from "../assets/logo big light 1.svg";
import ellipse from "../assets/Ellipse 1.png";

const SendAnotherFile = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="w-1276 h-768 border-4 border-red-700  ">
        <div className="flex w-640 h-384 bg-gray-800 bg-opacity-60 p-4">
          <div className="flex flex-col items-center justify-center w-448 h-640 bg-gray-800 bg-opacity-90">
            <div>
              <img src={ellipse} alt="" />
            </div>
            <div>
              <p>You are done!</p>
              <a href="/">Send another</a>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center p-4">
          <a href="/">
            <img src={logoBigLight} alt="Logo" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default SendAnotherFile;
