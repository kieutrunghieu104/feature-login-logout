import httpClient from "~/shared/api/httpClient";

const loginService = data => httpClient.post("/auth/login", data);
const logoutService = () => httpClient.delete("/auth/logout");
export {
  loginService,
  logoutService,
}