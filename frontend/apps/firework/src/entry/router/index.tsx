import { createBrowserRouter, RouterProvider } from "react-router";
import HomePage from "@/pages/HomePage";

function RootRouterProvider() {
  return <RouterProvider router={router} />;
}

const router = createBrowserRouter([
  {
    path: "/",
    Component: () => <HomePage />
  },
]);

export { RootRouterProvider };
