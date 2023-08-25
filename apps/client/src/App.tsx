import "./App.css";
import UploaderForm from "./components/UploaderForm";
import DownloaderForm from "./components/DownloaderForm";

export default function App() {
  return (
    <div>
      <div>
        <UploaderForm />
      </div>
      <div>
        <DownloaderForm />
      </div>
    </div>
  );
}
