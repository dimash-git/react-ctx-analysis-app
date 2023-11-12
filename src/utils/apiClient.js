import axios from "axios";

// fetch внутренний метод js -> Axios

// axios.post("http:localhost:8000")
// apiClient.post("/auth/me")
// 1. user не авторизован
// 2. user пробует внутренний api
// 3. получает ошибку 401 (не авторизован)
// 4. кастомный метод axios, отправляет запрос на новый токен и если токен успешно вернулся пользователю, то мы заново пробуем пункт 1

const apiClient = axios.create({
  withCredentials: true, // передаются куки
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // if Unauthorized
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Get new JWT token
        const response = await axios.post(
          import.meta.env.VITE_BACKEND_URL + "/auth/refresh",
          {},
          {
            withCredentials: true,
          }
        );
        if (response.status === 200) {
          // Retry again
          return apiClient(originalRequest);
        }
      } catch (refreshError) {
        // Redirect to login page
        // window.location.href = "/sign-in";
        return Promise.reject(refreshError);
      }
    }

    // If error is not 401 (Unauthorized)
    return Promise.reject(error);
  }
);

export default apiClient;
