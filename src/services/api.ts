import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor para logs e tratamento de token
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('mg_admin_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Interceptor para tratamento de erros
api.interceptors.response.use((response) => {
    return response;
}, (error) => {
    if (error.response?.status === 401) {
        localStorage.removeItem('mg_admin_token');
        localStorage.removeItem('mg_admin_user');
        window.location.href = '/auth/login';
    }
    const message = error.response?.data?.message || error.response?.data?.error || 'Erro de ligação ao servidor.';
    console.error(`❌ [API Error]`, message);
    return Promise.reject(error);
});


export default api;
