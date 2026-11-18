import { Button, Card, Space, Typography, Spin } from "antd";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import useDashboardMe from "../hooks/useDashboard";
import ROUTE_PATHS from "~/app/router/routePaths";
import { logoutService } from "~/features/auth/services/authService";
import useLogout from "~/features/auth/hooks/useLogout";

function DashboardPage() {
  const { getMe, user, loading } = useDashboardMe();
  const { logout, loading: loggingOut } = useLogout();
  const navigate = useNavigate();
  useEffect(() => {
    getMe();
  }, [getMe]);

  if (loading) {
    return <Spin size="large" fullscreen />;
  }

  const handleLogout = async () => {
    await logout();
    navigate(ROUTE_PATHS.login, { replace: true });
  }

  return (
    <>
      <Card style={{ maxWidth: 420, margin: "40px auto" }}>

        <Typography.Title level={4}>
          Dashboard
        </Typography.Title>

        <Space >
          <UserOutlined />
          <Typography.Text strong>
            {user?.email}
          </Typography.Text>
          <Button
            danger
            onClick={handleLogout}
            loading={loggingOut}
            icon={<LogoutOutlined />}
          >
            Logout
          </Button>
        </Space>

      </Card>

    </>
  );
}

export default DashboardPage;