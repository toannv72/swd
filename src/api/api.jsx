import axios from "axios";
import { useStorage } from "../hooks/useLocalStorage";

// eslint-disable-next-line react-hooks/rules-of-hooks

const item = window.localStorage.getItem("ACCESS_TOKEN");
console.log(item);
const api = axios.create({
  baseURL: "http://localhost:5000",
});
console.log(process.env.REACT_APP_BASE_URLS);
// Thêm các headers mặc định nếu cần
// api.defaults.headers.common["Authorization"] = "Bearer YOUR_ACCESS_TOKEN";

export const fetchData = async (endpoint, params = {}, headers = {}) => {
  try {
    const response = await api.get(endpoint, { params, headers });
    return response; // Trả về toàn bộ phản hồi từ API
  } catch (error) {
    throw error;
  }
};

export const createData = async (endpoint, data, headers = {}) => {
  try {
    const response = await api.post(endpoint, data, { headers });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateData = async (endpoint, id, data, headers = {}) => {
  try {
    const response = await api.put(`${endpoint}/${id}`, data, { headers });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteData = async (endpoint, id, headers = {}) => {
  try {
    const response = await api.delete(`${endpoint}/${id}`, { headers });
    return response.data;
  } catch (error) {
    throw error;
  }
};