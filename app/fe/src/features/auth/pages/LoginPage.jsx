import { Tabs } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';

import LoginForm from '../components/LoginForm';
import useLogin from '../hooks/useLogin';
import ROUTE_PATHS from "~/app/router/routePaths";

function LoginPage() {
  const { login, loading } = useLogin();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname ?? ROUTE_PATHS.dashboard;
  const handleLogin = async (values) => {
    const result = await login(values);
    localStorage.setItem("accessToken", result.accessToken);
    navigate(from, { replace: true });
  }
  return (
    <Tabs
      defaultActiveKey="login"
      centered
      items={[
        {
          key: 'login',
          label: 'Login',
          children: <LoginForm onSubmit={handleLogin} loading={loading} />,
        },
        // {
        //   key: 'register',
        //   label: 'Register',
        //   children: 'Content of Tab Pane 2',
        // },
      ]}
    />
  );
}

export default LoginPage;