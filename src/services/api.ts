// API Configuration
const API_BASE = (import.meta.env.VITE_API_URL || "http://localhost:8080/api") as string;

// Helper to get auth token from localStorage
export const getAuthToken = (): string | null => {
  return localStorage.getItem("authToken");
};

// Generic API call function
export const apiCall = async (
  endpoint: string,
  method: string = "GET",
  body: any = null,
  isFormData: boolean = false
): Promise<any> => {
  const token = getAuthToken();
  const headers: any = {
    "Authorization": token ? `Bearer ${token}` : "",
  };

  // Only set Content-Type if not FormData
  if (!isFormData) {
    headers["Content-Type"] = "application/json";
  }

  const config: RequestInit = {
    method,
    headers,
  };

  if (body) {
    if (isFormData) {
      config.body = body; // FormData object
    } else {
      config.body = JSON.stringify(body);
    }
  }

  const response = await fetch(`${API_BASE}${endpoint}`, config);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `HTTP Error: ${response.status}`);
  }

  return response.json();
};

// ==================== USERS API ====================
export const getUsers = async () => {
  return apiCall("/admin/users");
};

export const getUserById = async (userId: string) => {
  return apiCall(`/admin/users/${userId}`);
};

export const banUser = async (userId: string, banData: {
  banType: "temporary" | "permanent";
  reason: string;
  duration?: number;
}) => {
  return apiCall(`/admin/users/${userId}/ban`, "POST", banData);
};

export const unbanUser = async (userId: string) => {
  return apiCall(`/admin/users/${userId}/unban`, "POST");
};

export const updateUser = async (userId: string, userData: any) => {
  return apiCall(`/admin/users/${userId}`, "PUT", userData);
};

export const deleteUser = async (userId: string) => {
  return apiCall(`/admin/users/${userId}`, "DELETE");
};

// ==================== REQUESTS API ====================
export const getRequests = async () => {
  return apiCall("/requests");
};

export const getPendingRequests = async (type: "REQUEST" | "OFFER" = "REQUEST") => {
  return apiCall(`/requests/pending?type=${type}`);
};

export const getApprovedRequests = async (type: "REQUEST" | "OFFER" = "REQUEST") => {
  return apiCall(`/requests/approved?type=${type}`);
};

export const getRejectedRequests = async (type: "REQUEST" | "OFFER" = "REQUEST") => {
  return apiCall(`/requests/rejected?type=${type}`);
};

export const getRequestById = async (requestId: string) => {
  return apiCall(`/requests/${requestId}`);
};

export const createRequest = async (requestData: any) => {
  return apiCall("/requests", "POST", requestData);
};

export const updateRequest = async (requestId: string, requestData: any) => {
  return apiCall(`/requests/${requestId}`, "PUT", requestData);
};

export const deleteRequest = async (requestId: string) => {
  return apiCall(`/requests/${requestId}`, "DELETE");
};

export const approveRequest = async (requestId: string) => {
  return apiCall(`/requests/${requestId}/approve`, "POST");
};

export const rejectRequest = async (requestId: string, reason?: string) => {
  return apiCall(`/requests/${requestId}/reject`, "POST", { reason });
};

// ==================== CATEGORIES API ====================
export const getCategories = async () => {
  return apiCall("/categories");
};

export const getCategoryById = async (categoryId: string) => {
  return apiCall(`/categories/${categoryId}`);
};

export const createCategory = async (categoryData: {
  name: string;
  description?: string;
  isActive?: boolean;
}) => {
  return apiCall("/categories", "POST", categoryData);
};

export const updateCategory = async (categoryId: string, categoryData: any) => {
  return apiCall(`/categories/${categoryId}`, "PUT", categoryData);
};

export const deleteCategory = async (categoryId: string) => {
  return apiCall(`/categories/${categoryId}`, "DELETE");
};

// ==================== MODERATION API ====================
export const getModerationHistory = async (page: number = 1, limit: number = 20) => {
  return apiCall(`/admin/moderation-history?page=${page}&limit=${limit}`);
};

export const getTargetHistory = async (targetType: string, targetId: string) => {
  return apiCall(`/admin/moderation-history/${targetType}/${targetId}`);
};

export const getModeratorActivity = async (moderatorId: string) => {
  return apiCall(`/admin/moderators/${moderatorId}/activity`);
};

// ==================== ABUSE REPORTS API ====================
export const getAbuseReports = async (page: number = 1, limit: number = 20) => {
  return apiCall(`/admin/reports?page=${page}&limit=${limit}`);
};

export const approveAbuseReport = async (reportId: string) => {
  return apiCall(`/admin/reports/${reportId}/approve`, "POST");
};

export const rejectAbuseReport = async (reportId: string) => {
  return apiCall(`/admin/reports/${reportId}/reject`, "POST");
};

// ==================== ANALYTICS API ====================
export const getAnalytics = async () => {
  return apiCall("/analytics");
};

export const getDashboardStats = async () => {
  return apiCall("/analytics/dashboard");
};
