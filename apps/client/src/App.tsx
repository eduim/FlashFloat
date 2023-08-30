import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UploaderForm from "./components/UploaderForm";
import DownloadPage from "./components/DownloadPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <UploaderForm />,
  },
  {
    path: "/download/:id",
    element: <DownloadPage />,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
