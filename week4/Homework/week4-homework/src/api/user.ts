import { instance } from './axios'

export const getUserInfo = async (userId: number) => {
    const res = await instance.get(`/api/v1/users/${userId}`);
    const { success, message, data } = res.data;

    if (!success) {
        throw new Error(message);
    }

    return data;
};

export const updateUserInfo = async (
    userId: number,
    data: {
        name: string;
        email: string;
        age: number;
    }
) => {
    const res = await instance.patch(`/api/v1/users/${userId}`, data);
    return res.data;
};