import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Attach JWT token to requests
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

// CRUD APIs for students
export const getStudents = (params) => API.get('/students', { params });
export const createStudent = (data) => API.post('/students', data);
export const updateStudent = (id, data) => API.put(`/students/${id}`, data);
export const deleteStudent = (id) => API.delete(`/students/${id}`);

// Auth helpers (optional)
export const signup = (payload) => API.post('/auth/register', payload);
export const login = (payload) => API.post('/auth/login', payload);
export const demoLogin = () => API.post('/auth/demo');