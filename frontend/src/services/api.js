import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

export const getAllParcels = () => {
  return apiClient.get('/parcels');
};

export const createParcel = (parcelData) => {
  return apiClient.post('/parcels', parcelData);
};

export const updateParcel = (trackingId, parcelData) => {
  return apiClient.put(`/parcels/${trackingId}`, parcelData);
};

export const deleteParcel = (trackingId) => {
  return apiClient.delete(`/parcels/${trackingId}`);
};