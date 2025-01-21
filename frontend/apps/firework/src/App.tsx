/**
 * 主应用组件
 *
 * 功能：
 * 1. 提供全局配置（ConfigProvider）
 * 2. 提供应用级功能（AntdApp）
 * 3. 管理路由系统（RootRouterProvider）
 *
 * 注意事项：
 * - ConfigProvider用于配置Ant Design组件的全局样式和行为
 * - AntdApp提供应用级功能如全局消息、模态框等
 * - 路由系统负责页面导航和布局
 */
import './shared/styles/index.css'
import { App as AntdApp, ConfigProvider } from 'antd'
import { ErrorBoundary } from 'react-error-boundary'
import { RootRouterProvider } from '@/entry/router'

function App() {
  return (
    // 配置Ant Design主题和组件默认行为
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#1890ff' // 主色调
        }
      }}
    >
      {/* 提供应用级功能 */}
      <AntdApp>
        {/* 错误边界处理，防止应用崩溃 */}
        <ErrorBoundary
          fallback={<div>应用出现错误，请刷新页面重试</div>}
          onError={(error: Error) => {
            console.error('应用错误:', error)
          }}
        >
          {/* 路由系统 */}
          <RootRouterProvider />
        </ErrorBoundary>
      </AntdApp>
    </ConfigProvider>
  )
}

export default App

