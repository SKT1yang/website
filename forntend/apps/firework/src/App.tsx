import "./shared/styles/index.css";
import Home from "./domains/home/Home";
import { createBrowserRouter, RouterProvider } from "react-router";
import { ConfigProvider } from "antd";

function App() {
  return (
    <ConfigProvider>
      <RouterProvider router={createBrowserRouter(routes)} />
    </ConfigProvider>
  );
}

export default App;
