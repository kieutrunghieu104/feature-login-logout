import { useState } from 'react';
import { App } from 'antd';

import { loginService } from '../services/authService';

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { message } = App.useApp();
  const login = async (values) => {
    try {
      setLoading(true);
      const result = await loginService(values);
      message.success(result.message);
      return result.data;
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  }
  return {
    login,
    loading,
  };
};

export default useLogin;