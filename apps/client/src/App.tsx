import { createBrowserRouter, RouterProvider } from "react-router-dom";
import VerticalCard from "./components/VerticalCard"; // Import the VerticalCard component
import UploaderForm from "./components/UploaderForm";
import DownloadPage from "./components/DownloadPage";
import UploadConfirmation from "./components/UploadConfirmation";
import HorizontalCard from "./components/HorizontalCard";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <VerticalCard x={310} y={171} w={446} h={640}>
          <UploaderForm />
        </VerticalCard>
      </div>
    ),
  },

  {
    path: "/confirmation",
    element: (
      <HorizontalCard>
        <UploadConfirmation />
      </HorizontalCard>
    ),
  },
  {
    path: "/download/:uploadId",
    element: (
      <HorizontalCard x={310} y={171} w={1000} h={640}>
        <DownloadPage />
      </HorizontalCard>
    ),
  },
]);

export default function App() {
  return (
    <div className="bg-app-background bg-cover  bg-no-repeat bg-center min-h-screen">
      <RouterProvider router={router} />
    </div>
  );
}
