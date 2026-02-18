// Environment-based API configuration
const isDevelopment = import.meta.env.DEV;
const isProduction = import.meta.env.PROD;

// Force production URLs for deployed builds
const PRODUCTION_API_URL = 'https://community-support-flatform-backend-1-0ghf.onrender.com';
const PRODUCTION_SOCKET_URL = 'https://community-support-flatform-backend-1-0ghf.onrender.com';

// Use production URLs by default, only use localhost in specific dev cases
export const API_BASE_URL = PRODUCTION_API_URL;
export const SOCKET_URL = PRODUCTION_SOCKET_URL;

// Debug logging
console.log('🔧 API Configuration:', {
  isDevelopment,
  isProduction,
  API_BASE_URL,
  SOCKET_URL
});
