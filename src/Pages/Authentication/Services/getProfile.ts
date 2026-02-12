const API_BASE_URL = 'http://localhost:8080/api';

export class GetProfileService {
  private getToken(): string | null {
    return localStorage.getItem('token');
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
    } catch (error: unknown) {
      console.error('❌ Get profile error:', error);
      throw error;
    }
  }
}