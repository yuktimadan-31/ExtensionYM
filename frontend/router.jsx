import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import NotFound from "./pages/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/company/:company_id/*",
    element: <App />,
  },
  {
    path: "/company/:company_id/application/:application_id/*",
    element: <App />,
  },
  {
    path: "/*",
    element: <NotFound />,
  },
]);

export default router;
