import { instance } from './axios'
import type { UpdateUserRequest, User } from '@/types/user'

export const getUserInfo = async (userId: number): Promise<User> => {
    const res = await instance.get(`/api/v1/users/${userId}`);
    const { success, message, data } = res.data;

    if (!success) {
        throw new Error(message);
    }

    return data;
};

export const updateUserInfo = async (
    userId: number,
    data: UpdateUserRequest
) => {
    const res = await instance.patch(`/api/v1/users/${userId}`, data);
    return res.data;
};

export const getUserList = async (): Promise<User[]> => {
    const res = await instance.get("/api/v1/users");
    const { success, message, data } = res.data;

    if (!success) {
        throw new Error(message);
    }

    return data.users;
};