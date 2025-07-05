import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth Services
export const authService = {
  login: (email, password) => api.post('/auth/login', { email, password }),
  register: (name, email, password) => api.post('/auth/register', { name, email, password }),
};

// Problem Services
export const problemService = {
  getProblems: (search = '', difficulty = '') => {
    const params = new URLSearchParams();
    if (search) params.append('search', search);
    if (difficulty) params.append('difficulty', difficulty);
    return api.get(`/problems/problems?${params}`);
  },
  getProblem: (id) => api.get(`/problems/problems/${id}`),
};

// Admin Services
export const adminService = {
  createProblem: (problemData) => api.post('/admin/problems', problemData),
  updateProblem: (id, problemData) => api.put(`/admin/problems/${id}`, problemData),
  deleteProblem: (id) => api.delete(`/admin/problems/${id}`),
  getProblems: () => api.get('/admin/problems'),
};

// Submission Services
export const submissionService = {
  submitCode: (problemId, code, language) => 
    api.post('/code/submit', { problemId, code, language }),
  getSubmissions: (problemId) => 
    api.get(`/code/submissions${problemId ? `?problemId=${problemId}` : ''}`),
  getSubmissionStatus: (submissionId) => 
    api.get(`/code/submission/${submissionId}`),
};

// Leaderboard Services
export const leaderboardService = {
  getLeaderboard: () => api.get('/leaderboard'),
};

export default api;