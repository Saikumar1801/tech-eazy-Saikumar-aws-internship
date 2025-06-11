import axios from 'axios';
const apiClient = axios.create({ baseURL: 'http://localhost:8080/api' });
apiClient.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) { config.headers.Authorization = `Bearer ${token}`; }
    return config;
}, error => Promise.reject(error));
// AUTH
export const apiLogin = (username, password) => apiClient.post('/auth/login', { username, password });
export const apiRegister = (username, password) => apiClient.post('/auth/register', { username, password });
// DELIVERY ORDERS
export const getDeliveryOrders = (params) => apiClient.get('/delivery-orders', { params });
export const uploadDeliveryOrderFile = (formData) => apiClient.post('/delivery-orders/upload', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
// PARCELS
export const getParcels = () => apiClient.get('/parcels');
export const createParcel = (parcelData) => apiClient.post('/parcels', parcelData);
export const deleteParcel = (id) => apiClient.delete(`/parcels/${id}`);
export const updateParcel = (id, parcelData) => apiClient.put(`/parcels/${id}`, parcelData);
