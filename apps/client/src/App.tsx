import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import VerticalCard from "./components/VerticalCard";
import HorizontalCard from "./components/HorizontalCard";
import UploaderForm from "./components/UploaderForm";
import TransferDetails from "./components/TransferDetails";
import SendAnotherFile from "./components/SendAnotherFile";
import DownloadFile from "./components/DownloadFile";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <VerticalCard classes="translate-x-[90%]">
          <UploaderForm />
        </VerticalCard>
      </Layout>
    ),
  },
  {
    path: "/confirmation",
    element: (
      <Layout classes="gap-12">
        <HorizontalCard>
          <TransferDetails isSender={true} />
        </HorizontalCard>
        <VerticalCard>
          <SendAnotherFile />
        </VerticalCard>
      </Layout>
    ),
  },
  {
    path: "/download/:uploadId",
    element: (
      <Layout>
        <VerticalCard>
          <DownloadFile />
        </VerticalCard>
        <HorizontalCard>
          <TransferDetails isSender={false} />
        </HorizontalCard>
      </Layout>
    ),
  },
]);

export default function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}
