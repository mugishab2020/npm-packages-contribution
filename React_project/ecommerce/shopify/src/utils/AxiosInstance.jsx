import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// === REQUEST INTERCEPTOR ===
axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');

    if (token) {
        config.headers['token'] = `Bearer ${token}`
    }

    return config;
},
    (error) => {
        console.error('Request error:', error);
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            console.warn('Unauthorized! Redirect to login.');

            localStorage.removeItem('token');
            window.location.href = '/login';
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
