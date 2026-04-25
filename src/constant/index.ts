export const API_URL = import.meta.env.PROD
  ? import.meta.env.PUBLIC_API_URL_PROD
  : import.meta.env.PUBLIC_API_URL_DEV;
