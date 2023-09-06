import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import VerticalCard from "./components/VerticalCard";
import HorizontalCard from "./components/HorizontalCard";
import UploaderForm from "./components/UploaderForm";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <VerticalCard>
          <UploaderForm />
        </VerticalCard>
      </Layout>
    ),
  },
  {
    path: "/confirmation",
    element: (
      <Layout>
        <HorizontalCard>
          numberOfFiles={1}
          fileSize="33KB" recipientEmail="john.doe@example.com"
          fileTitle="Summer pics" senderMessage="These are the pictures I took
          of us."
        </HorizontalCard>
        <VerticalCard>{/* Content for confirmation page */}</VerticalCard>
      </Layout>
    ),
  },
  {
    path: "/download/:uploadId",
    element: (
      <Layout>
        <VerticalCard>{/* Content for download page */}</VerticalCard>
        <HorizontalCard>{/* Content for download page */}</HorizontalCard>
      </Layout>
    ),
  },
]);

export default function App() {
  return (
    <div className="bg-app-background bg-cover bg-no-repeat bg-center min-h-screen">
      <RouterProvider router={router} />
    </div>
  );
}
