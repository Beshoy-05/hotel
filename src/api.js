import axios from "axios";

// Vite proxy will forward /api → http://hotel-booking.runasp.net/api
const api = axios.create({
  baseURL: "/api",
  timeout: 15000,
});

// Add token automatically
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("jwt_token");
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Auth
export const login = (payload) => api.post("/Auth/login", payload);
export const register = (payload) => api.post("/Auth/register", payload);

// Rooms
export const getRooms = () => api.get("/Rooms");
export const getRoom = (id) => api.get(`/Rooms/${id}`);
export const createRoom = (payload) => api.post("/Rooms", payload);
export const updateRoom = (id, payload) => api.put(`/Rooms/${id}`, payload);
export const deleteRoom = (id) => api.delete(`/Rooms/${id}`);

// Bookings
export const createBooking = (payload) => api.post("/Bookings", payload);
export const myBookings = () => api.get("/Bookings/my-bookings");
export const getBooking = (id) => api.get(`/Bookings/${id}`);
export const cancelBooking = (id) => api.put(`/Bookings/${id}/cancel`);
export const setBookingStatus = (id, payload) => api.put(`/Bookings/${id}/status`, payload);

// Payment
export const createPaymentIntent = (payload) => api.post("/Payment/create-payment-intent", payload);
export const getPaymentStatus = (paymentIntentId) =>
  api.get(`/Payment/status/${encodeURIComponent(paymentIntentId)}`);

// Admin
export const adminGetUsers = () => api.get("/Admin/users");
export const adminGetUser = (userId) => api.get(`/Admin/users/${userId}`);
export const adminAssignRole = (userId, payload) =>
  api.post(`/Admin/users/${userId}/assign-role`, payload);
export const adminRemoveRole = (userId) =>
  api.post(`/Admin/users/${userId}/remove-role`);

export default api;
