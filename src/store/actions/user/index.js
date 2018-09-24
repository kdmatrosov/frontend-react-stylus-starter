import { CHECH_AUTH } from "./USER_TYPES";

export const checkAuth = () => ({
  type: CHECH_AUTH,
  payload: true
});