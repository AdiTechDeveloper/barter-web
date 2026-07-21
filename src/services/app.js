import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL;

const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

export const extractErrorMessage = (err) => {
  const responseData = err.response?.data;
  if (responseData?.errors) {
    const firstField = Object.keys(responseData.errors)[0];
    return responseData.errors[firstField]?.[0] || "Validation failed.";
  }
  return (
    responseData?.message ||
    err.message ||
    "Something went wrong. Please try again."
  );
};

export const authService = {
  login: async (credentials) => {
    const response = await apiClient.post("/auth/login", credentials);
    const payload = response.data.data || response.data;
    if (payload.token) {
      localStorage.setItem("token", payload.token);
    }
    return payload;
  },

  register: async (userData) => {
    const payload = {
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      password: userData.password,
      password_confirmation: userData.password_confirmation,
    };
    const response = await apiClient.post("/auth/register", payload);
    const registeredUser =
      response.data.data?.user || response.data.data || response.data;

    try {
      const loginResponse = await authService.login({
        email: userData.email,
        password: userData.password,
      });
      return {
        user: loginResponse.user || registeredUser,
        token: loginResponse.token,
      };
    } catch (loginError) {
      console.warn(
        "Registration succeeded, but auto-login failed:",
        loginError,
      );
      return { user: registeredUser, token: null };
    }
  },

  logout: async () => {
    try {
      await apiClient.post("/auth/logout");
    } catch (error) {
      console.error("Failed to invalidate token on the server:", error);
    } finally {
      localStorage.removeItem("token");
    }
  },
};

export const profileService = {
  get: async () => {
    const response = await apiClient.get("/profile");
    return response.data.data || response.data;
  },
  update: async (formData) => {
    const response = await apiClient.post("/profile", formData);
    return response.data.data || response.data;
  },
};

export const categoryService = {
  getAll: async () => {
    const response = await apiClient.get("/categories");
    const categories = response.data.data || [];
    return Array.isArray(categories) ? categories : [];
  },

  create: async (formData) => {
    const response = await apiClient.post("/categories", formData);
    return response.data.data || response.data;
  },

  update: async (id, formData) => {
    formData.append("_method", "PUT");
    const response = await apiClient.post(`/categories/${id}`, formData);
    return response.data.data || response.data;
  },

  delete: async (id) => {
    await apiClient.delete(`/categories/${id}`);
  },
};

export const itemService = {
  getAll: async (params = {}) => {
    const response = await apiClient.get("/items", { params });
    const items = response.data.data?.data || response.data.data || [];
    return {
      items: Array.isArray(items) ? items : [],
      meta: response.data.data || {},
    };
  },
  getCategories: async () => {
    const response = await apiClient.get("/categories");
    const categories = response.data.data || [];
    return Array.isArray(categories) ? categories : [];
  },
  getById: async (id) => {
    const response = await apiClient.get(`/items/${id}`);
    return response.data.data || response.data;
  },
  getMyItems: async (params = {}) => {
    const response = await apiClient.get("/my-items", { params });
    const items = response.data?.data?.data || [];
    return Array.isArray(items) ? items : [];
  },
  create: async (formData) => {
    const response = await apiClient.post("/items", formData);
    return response.data?.data || response.data;
  },
  update: async (id, formData) => {
    const response = await apiClient.post(`/items/${id}/update`, formData);
    return response.data?.data || response.data;
  },
  delete: async (id) => {
    await apiClient.delete(`/items/${id}`);
  },
};

export const barterService = {
  createOffer: async ({ requestedItemId, offeredItemId, notes }) => {
    const response = await apiClient.post("/barter-offers", {
      requested_item_id: requestedItemId,
      offered_item_id: offeredItemId,
      notes,
    });
    return response.data.data || response.data;
  },

  getIncoming: async () => {
    const response = await apiClient.get("/barter-offers/incoming");
    const offers = response.data?.data?.data || response.data?.data || [];
    return Array.isArray(offers) ? offers : [];
  },

  getOutgoing: async () => {
    const response = await apiClient.get("/barter-offers/outgoing");
    const offers = response.data?.data?.data || response.data?.data || [];
    return Array.isArray(offers) ? offers : [];
  },

  updateStatus: async (offerId, status) => {
    const response = await apiClient.patch(`/barter-offers/${offerId}/status`, {
      status,
    });
    return response.data?.data || response.data;
  },
};

export const reviewService = {
  create: async ({ barterOfferId, rating, comment }) => {
    const response = await apiClient.post("/reviews", {
      barter_offer_id: barterOfferId,
      rating,
      comment,
    });
    return response.data?.data || response.data;
  },

  getUserReviews: async (userId) => {
    const response = await apiClient.get(`/users/${userId}/reviews`);
    return {
      reviews: response.data?.data?.data || [],
      averageRating: response.data?.average_rating || 0,
      total: response.data?.data?.total || 0,
    };
  },
};

export const searchHistoryService = {
  getAll: async () => {
    const response = await apiClient.get("/search-history");
    const history = response.data?.data?.data || response.data?.data || [];
    return Array.isArray(history) ? history : [];
  },

  clearAll: async () => {
    await apiClient.delete("/search-history");
  },
};

export default apiClient;
