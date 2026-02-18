const isDevelopment = import.meta.env.DEV;
const isProduction = import.meta.env.PROD;

// Local development URLs
const LOCAL_API_URL = 'http://localhost:8080';
const LOCAL_SOCKET_URL = 'http://localhost:8080';

// Production URLs (Render)
const PRODUCTION_API_URL = 'https://community-support-flatform-backend-1-0ghf.onrender.com';
const PRODUCTION_SOCKET_URL = 'https://community-support-flatform-backend-1-0ghf.onrender.com';

// Select URLs based on environment
export const API_BASE_URL = isDevelopment ? LOCAL_API_URL : PRODUCTION_API_URL;
export const SOCKET_URL = isDevelopment ? LOCAL_SOCKET_URL : PRODUCTION_SOCKET_URL;

// Debug info
console.log('🔧 API Configuration:', {
  isDevelopment,
  isProduction,
  API_BASE_URL,
  SOCKET_URL
});
