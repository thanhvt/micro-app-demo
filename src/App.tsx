import React, { useEffect, useState, useCallback } from 'react';
import { BrowserRouter, Link, Navigate, Route, Routes } from 'react-router-dom';
import { Layout, Menu, Avatar, Dropdown, Button } from 'antd';
import { UserOutlined, ShoppingOutlined, TeamOutlined, MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { AuthState, EventBus } from './types/auth';

// Import pages
import ProductList from './features/products/ProductList';
import ProductDetail from './features/products/ProductDetail';
import ProductForm from './features/products/ProductForm';
import CustomerList from './features/customers/CustomerList';
import CustomerDetail from './features/customers/CustomerDetail';
import CustomerForm from './features/customers/CustomerForm';

const { Header, Sider, Content } = Layout;

// Define the props that the shell will pass to the micro frontend
interface AppProps {
  basePath: string;
  authState: AuthState;
  eventBus: EventBus;
  path: string;
  isEmbedded?: boolean;
}

const App: React.FC<AppProps> = ({ basePath, authState, eventBus, path, isEmbedded = false }) => {
  const [user, setUser] = useState(authState?.user);
  const [currentPath, setCurrentPath] = useState(path);
  const [collapsed, setCollapsed] = useState(false);
  
  // Hàm để cập nhật auth state
  const updateAuth = useCallback((newAuthState: AuthState) => {
    setUser(newAuthState?.user);
  }, []);

  // Hàm để cập nhật path
  const updatePath = useCallback((newPath: string) => {
    setCurrentPath(newPath);
    // Không sử dụng useLocation ở đây, thay vào đó lưu path trong state
  }, []);

  // Đăng ký các hàm cập nhật vào window để bootstrap.tsx có thể gọi
  useEffect(() => {
    window.microAppUpdateAuth = updateAuth;
    window.microAppRouter = {
      navigate: updatePath
    };
    
    return () => {
      delete window.microAppUpdateAuth;
      delete window.microAppRouter;
    };
  }, [updateAuth, updatePath]);

  // Listen for auth state changes from the shell
  useEffect(() => {
    const unsubscribe = eventBus.on('shell:auth-change', (newAuthState: AuthState) => {
      updateAuth(newAuthState);
    });

    // Request the current auth state from the shell
    eventBus.emit('micro:request-auth', {});

    // Clean up the subscription when the component unmounts
    return unsubscribe;
  }, [eventBus, updateAuth]);

  const showNotification = (message: string, type: 'success' | 'error' | 'info' | 'warning' = 'info') => {
    eventBus.emit('shell:notification', { type, message });
  };

  const navigateToShell = (path: string) => {
    eventBus.emit('shell:navigation', { path });
  };

  const userMenu = (
    <Menu>
      <Menu.Item key="profile">Profile</Menu.Item>
      <Menu.Item key="settings">Settings</Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout">Logout</Menu.Item>
    </Menu>
  );

  return (
    <BrowserRouter basename={basePath}>
      <Layout style={{ minHeight: "100vh" }}>
        {!isEmbedded && (
          <Sider trigger={null} collapsible collapsed={collapsed} theme="light">
            <div className="p-4 h-16 flex items-center justify-center border-b border-gray-200">
              <h1
                className={`text-lg font-bold ${
                  collapsed ? "hidden" : "block"
                }`}
              >
                Micro App Demo
              </h1>
              {collapsed && <ShoppingOutlined style={{ fontSize: "24px" }} />}
            </div>
            <Menu
              mode="inline"
              defaultSelectedKeys={["products"]}
              style={{ height: "100%", borderRight: 0 }}
            >
              <Menu.Item key="products" icon={<ShoppingOutlined />}>
                <Link to="/">Products</Link>
              </Menu.Item>
              <Menu.Item key="customers" icon={<TeamOutlined />}>
                <Link to="/customers">Customers</Link>
              </Menu.Item>
            </Menu>
          </Sider>
        )}

        <Layout>
          {!isEmbedded && (
          <Header className="bg-white p-0 flex justify-between items-center px-4 shadow-sm">
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
            />
            <div className="flex items-center">
              {user && <span className="mr-2">Welcome, {user.name}</span>}
              <Dropdown overlay={userMenu} placement="bottomRight">
                <Avatar icon={<UserOutlined />} />
              </Dropdown>
            </div>
          </Header>)}
          <Content className="bg-gray-50">
            <Routes>
              <Route path="/" element={<Navigate to="/products" replace />} />
              <Route path="/products" element={<ProductList />} />
              <Route path="/products/new" element={<ProductForm />} />
              <Route path="/products/edit/:id" element={<ProductForm />} />
              <Route path="/products/:id" element={<ProductDetail showNotification={showNotification}/>} />
              <Route path="/customers" element={<CustomerList />} />
              <Route path="/customers/:id" element={<CustomerDetail />} />
              <Route path="/customers/new" element={<CustomerForm />} />
              <Route path="/customers/edit/:id" element={<CustomerForm />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
