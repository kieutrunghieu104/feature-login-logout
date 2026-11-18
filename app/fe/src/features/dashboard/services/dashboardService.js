
import httpClient from "~/shared/api/httpClient";

const getCurrentUserService = () => httpClient.get("/dashboard/me");

export {
  getCurrentUserService,
}