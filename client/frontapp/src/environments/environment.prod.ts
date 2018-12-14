import { variable } from "./config/production";
export const environment = {
  production: true,
  WEB_API_URL: variable["WEB_API_URL"]
};
