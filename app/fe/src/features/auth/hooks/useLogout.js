
import { App } from "antd";
import { useCallback, useState } from "react";

import { logoutService } from "../services/authService";

function useLogout() {
  const { message } = App.useApp();
  const [loading, setLoading] = useState(false);

  const logout = useCallback(async () => {
    try {
      setLoading(true);
      const result = await logoutService();
      message.success(result.message);
    } catch (error) {
      message.error(error.message);
    } finally {
      localStorage.removeItem("accessToken");
      setLoading(false);
    }

  }, [message]);
  return ({
    logout,
    loading
  });
}

export default useLogout;