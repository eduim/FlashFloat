const UploadConfirmation = () => {

  return (
    <div>
      <div className="w-640 h-384 bg-gray-800 bg-opacity-60">
        <p>Your transfer details</p>
        <p> 1 file. 33.89b . Expires in 1 week</p>
        <p>Sending to</p>
        <p>arolvinilas@arol.dev</p>
        <p>Title</p>
        <p>Summer pics 2023</p>
        <p>Message</p>
        <p>This are the images I took this summer. Best summer!</p>
      </div>
      <div className="absolute w-448 h-640 bg-gray-800 bg-opacity-90">
        <p>Your are done!</p>
        <p>Send another?</p>
      </div>
    </div>
  );
};

export default UploadConfirmation;
