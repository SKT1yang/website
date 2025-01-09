import { lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router";

function RootRouterProvider() {
  return <RouterProvider router={router} />;
}

const router = createBrowserRouter([
  {
    path: "/",
    Component: lazy(() => import("@/pages/HomePage")),
  },
]);

export { RootRouterProvider };
