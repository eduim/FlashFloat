import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import VerticalCard from "./components/VerticalCard";
import HorizontalCard from "./components/HorizontalCard";
import UploaderForm from "./components/UploaderForm";
import TransferDetails from "./components/TransferDetails";
import SendAnotherFile from "./components/SendAnotherFile";
import DownloadFile from "./components/DownloadFile";
import Logo from "./components/Logo"

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <Logo/>
        <VerticalCard classes="translate-x-[60%]">
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
        <Logo />
      </Layout>
    ),
  },
  {
    path: "/download/:uploadId",
    element: (
      <Layout classes="gap-12">
        <HorizontalCard>
          <TransferDetails isSender={false} />
        </HorizontalCard>
        <VerticalCard>
          <DownloadFile />
        </VerticalCard>
        <Logo />
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
