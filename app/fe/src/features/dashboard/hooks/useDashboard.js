import { useCallback, useState } from "react";
import { App } from 'antd';

import { getCurrentUserService } from "../services/dashboardService";

const useDashboardMe = () => {
  const { message } = App.useApp();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const getMe = useCallback(
    async () => {
      setLoading(true);
      try {
        const result = await getCurrentUserService();
        setUser(result.data);
      } catch (error) {
        message.error(error.message)
      } finally {
        setLoading(false);
      }
    }, [message]);

  return {
    getMe,
    user,
    loading,
  }
}

export default useDashboardMe;