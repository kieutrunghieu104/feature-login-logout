const setupInterceptors = (httpClient) => {
  httpClient.interceptors.request.use(
    config => {
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    },
    error => Promise.reject(error),
  );

  httpClient.interceptors.response.use(
    response => {
      return response.data
    },
    error => {
      if (error.response?.status === 401) {
        localStorage.removeItem("accessToken");
        location.href = "/login";
      }
      if (error.response) {
        return Promise.reject(error.response.data);
      }
      if (error.request) {
        return Promise.reject({ message: "Kết nối đến máy chủ thất bại" });
      }
      return Promise.reject({ message: "Lỗi trong quá trình tạo request" });
    },
  );
};

export default setupInterceptors;