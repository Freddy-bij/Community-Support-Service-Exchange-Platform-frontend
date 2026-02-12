const API_BASE_URL = 'http://localhost:8080/api';

export class LogoutService {
  private getToken(): string | null {
    return localStorage.getItem('authToken');
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
}