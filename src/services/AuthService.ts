import api from '../config/api';

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

class AuthService {
  async register(data: RegisterData): Promise<AuthResponse> {
    try {
      console.log('📤 Sending registration request:', { 
        name: data.name, 
        email: data.email,
        url: api.defaults.baseURL + '/auth/register'
      });

      const response = await api.post('/auth/register', data);
      
      console.log('📥 Registration response:', {
        status: response.status,
        data: response.data
      });

      if (response.data.token) {
        localStorage.setItem('authToken', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        console.log('✅ Token saved to localStorage');
      }
      
      return response.data;
    } catch (error: any) {
      console.error('❌ Registration error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        statusText: error.response?.statusText,
        url: error.config?.url,
        method: error.config?.method,
        fullError: error
      });

     
      if (error.response?.data) {
        throw error.response.data;
      } else if (error.request) {
        throw { 
          error: 'Cannot connect to server. Please check if the backend is running and CORS is configured.' 
        };
      } else {
        throw { error: error.message || 'Registration failed' };
      }
    }
  }

  async login(data: LoginData): Promise<AuthResponse> {
    try {
      console.log('📤 Sending login request:', { 
        email: data.email,
        url: api.defaults.baseURL + '/auth/login'
      });

      const response = await api.post('/auth/login', data);
      
      console.log('📥 Login response:', {
        status: response.status,
        data: response.data
      });

      if (response.data.token) {
        localStorage.setItem('authToken', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        console.log('✅ Token saved to localStorage');
      }
      
      return response.data;
    } catch (error: any) {
      console.error('❌ Login error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        statusText: error.response?.statusText,
        fullError: error
      });

      if (error.response?.data) {
        throw error.response.data;
      } else if (error.request) {
        throw { error: 'Cannot connect to server. Please check your connection.' };
      } else {
        throw { error: error.message || 'Login failed' };
      }
    }
  }

  async logout(): Promise<void> {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
    }
  }

  async getProfile() {
    try {
      const response = await api.get('/auth/profile');
      return response.data;
    } catch (error: any) {
      console.error('❌ Get profile error:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });

      if (error.response?.data) {
        throw error.response.data;
      } else {
        throw { error: 'Failed to fetch profile' };
      }
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