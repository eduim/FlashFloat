import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UploaderForm from "./components/UploaderForm";
import DownloadPage from "./components/DownloadPage";
import UploadConfirmation from "./components/UploadConfirmation";

const router = createBrowserRouter([
  {
    path: "/",
    element: <UploaderForm />,
  },
  {
    path: "/confirmation",
    element: <UploadConfirmation />,
  },
  {
    path: "/download/:uploadId",
    element: <DownloadPage />,
  },
]);

export default function App() {
  return (
    <div className="bg-app-background bg-cover  bg-no-repeat bg-center min-h-screen">
      <RouterProvider router={router} />
    </div>
  )
}
