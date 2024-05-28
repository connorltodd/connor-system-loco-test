import axios from 'axios';

export const BASE_URL = process.env.REACT_APP_BASE_URL;

const axiosClient = axios.create({
    baseURL: BASE_URL,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
});


export function getDevices() {
    return axiosClient.get('/listDevices');
}

export function  getDeviceById(deviceId) {
    return axiosClient.get(`/device/${deviceId}`);
}