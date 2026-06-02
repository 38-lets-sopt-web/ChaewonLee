import { axiosInstance } from './axios-instance'

export const http = {
  get: async <TResponse>(url: string, params?: Record<string, unknown>) => {
    const response = await axiosInstance.get<TResponse>(url, { params })

    return response.data
  },

  post: async <TResponse, TRequest = unknown>(
    url: string,
    data?: TRequest,
    params?: Record<string, unknown>,
  ) => {
    const response = await axiosInstance.post<TResponse>(url, data, { params })

    return response.data
  },

  delete: async <TResponse>(url: string, params?: Record<string, unknown>) => {
    const response = await axiosInstance.delete<TResponse>(url, { params })

    return response.data
  },
}
