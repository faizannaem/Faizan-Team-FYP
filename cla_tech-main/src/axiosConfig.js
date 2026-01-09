import axios from 'axios';
import Swal from 'sweetalert2';

// Create an axios instance
const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/', // Replace with your API base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Retrieve the token from localStorage
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      // Handle missing token case
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Authorization token is missing. Please log in again.',
      });
    }
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    let errorMessage = 'An error occurred. Please try again.';
    if (error.response) {
      // Server responded with a status code outside the 2xx range
      switch (error.response.status) {
        case 400:
          errorMessage = 'Bad request. Please check your input.';
          break;
        case 401:
          errorMessage = 'Unauthorized access. Please log in again.';
          break;
        case 403:
          errorMessage = 'You do not have permission to perform this action.';
          break;
        case 404:
          errorMessage = 'Resource not found.';
          break;
        case 500:
          errorMessage = 'Server error. Please try again later.';
          break;
        default:
          errorMessage = error.response.data.message || errorMessage;
          break;
      }
    } else if (error.request) {
      // Request was made but no response received
      errorMessage = 'No response from server. Please check your network.';
    } else {
      // Something happened in setting up the request
      errorMessage = 'Error setting up the request. Please try again.';
    }

    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: errorMessage,
    });

    return Promise.reject(error);
  }
);

export default axiosInstance;
