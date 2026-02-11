

const API_BASE_URL = 'http://localhost:8080/api';

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
    profilePicture?: string;
    createdAt: string;
  };
  message: string;
}

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

async function fetchWithRetry(url: string, options: RequestInit, maxRetries = 2): Promise<Response> {
  let lastError: Error | null = null;
  
  for (let i = 0; i <= maxRetries; i++) {
    try {
      console.log(`🔄 Attempt ${i + 1}/${maxRetries + 1}...`);
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 60000); // 60 second timeout
      
      const response = await fetch(url, {
        ...options,
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      return response;
      
    } catch (error: any) {
      lastError = error;
      console.warn(`⚠️ Attempt ${i + 1} failed:`, error.message);
 
      if (i === maxRetries) {
        throw error;
      }
      
      const waitTime = (i + 1) * 15000; 
      console.log(`⏳ Waiting ${waitTime/1000}s before retry...`);
      await sleep(waitTime);
    }
  }
  
  throw lastError || new Error('Request failed');
}

class AuthService {
  async register(data: RegisterData): Promise<AuthResponse> {
    try {
      console.log('📤 Sending registration request:', { 
        name: data.name, 
        email: data.email,
        url: `${API_BASE_URL}/auth/register`
      });

      const response = await fetchWithRetry(
        `${API_BASE_URL}/auth/register`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }
      );

      const responseData = await response.json();
      
      console.log('📥 Registration response:', {
        status: response.status,
        data: responseData
      });

      if (!response.ok) {
        throw new Error(responseData.message || responseData.error || 'Registration failed');
      }

      if (responseData.token) {
        localStorage.setItem('authToken', responseData.token);
        localStorage.setItem('user', JSON.stringify(responseData.user));
        console.log('✅ Token saved to localStorage');
      }
      
      return responseData;
    } catch (error: any) {
      console.error('❌ Registration error details:', error);
      
      if (error.name === 'AbortError') {
        throw new Error('Request timed out. The server might be starting up. Please try again in 30 seconds.');
      }
      
      if (error.message === 'Failed to fetch' || error.message?.includes('NetworkError')) {
        throw new Error('Cannot connect to server. It might be waking up (Render free tier). Please wait 30 seconds and try again.');
      }
      
      throw error;
    }
  }

  async login(data: LoginData): Promise<AuthResponse> {
    try {
      console.log('📤 Sending login request:', { 
        email: data.email,
        url: `${API_BASE_URL}/auth/login`
      });

      const response = await fetchWithRetry(
        `${API_BASE_URL}/auth/login`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }
      );

      const responseData = await response.json();
      
      console.log('📥 Login response:', {
        status: response.status,
        data: responseData
      });

      if (!response.ok) {
        throw new Error(responseData.message || responseData.error || 'Login failed');
      }

      if (responseData.token) {
        localStorage.setItem('authToken', responseData.token);
        localStorage.setItem('user', JSON.stringify(responseData.user));
        console.log('✅ Token saved to localStorage');
      }
      
      return responseData;
    } catch (error: any) {
      console.error('❌ Login error details:', error);

      if (error.name === 'AbortError') {
        throw new Error('Request timed out. Please try again.');
      }

      if (error.message === 'Failed to fetch' || error.message?.includes('NetworkError')) {
        throw new Error('Cannot connect to server. Please check your connection or try again in a moment.');
      }
      
      throw error;
    }
  }

  async logout(): Promise<void> {
    try {
      const token = this.getToken();
      
      await fetch(`${API_BASE_URL}/auth/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
    }
  }

  async getProfile() {
    try {
      const token = this.getToken();
      
      const response = await fetch(`${API_BASE_URL}/auth/profile`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || data.error || 'Failed to fetch profile');
      }

      return data;
    } catch (error: any) {
      console.error('❌ Get profile error:', error);
      throw error;
    }
  }

  getCurrentUser() {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken');
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }
}

export default new AuthService();