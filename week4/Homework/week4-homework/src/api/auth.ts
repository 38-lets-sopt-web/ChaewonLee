import { instance } from './axios'
import type { SignupForm, SignupRequest } from '../types/auth'

export const signup = async (form: SignupForm) => {
    const requestBody: SignupRequest = {
        loginId: form.loginId,
        password: form.password,
        name: form.name,
        email: form.email,
        age: Number(form.age),
        part: form.part,
    }

    const response = await instance.post(
        '/api/v1/auth/signup',
        requestBody
    )

    return response.data
}