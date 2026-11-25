import httpClient from "~/shared/api/httpClient";

const loginService = data => httpClient.post("/auth/login", data);
const logoutService = () => httpClient.post("/auth/logout");
const refreshTokenService = () => httpClient.post("/auth/refresh-token");
const getCurrentUserService = () => httpClient.get("auth/me");
export {
  loginService,
  logoutService,
  refreshTokenService,
  getCurrentUserService,
};