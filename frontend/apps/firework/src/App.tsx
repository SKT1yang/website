import "./shared/styles/index.css";
import { ConfigProvider, App as AntdApp } from "antd";
import { RootRouterProvider } from "@/entry/router";

function App() {
  return (
    <ConfigProvider>
      <AntdApp>
        <RootRouterProvider />
      </AntdApp>
    </ConfigProvider>
  );
}

export default App;
