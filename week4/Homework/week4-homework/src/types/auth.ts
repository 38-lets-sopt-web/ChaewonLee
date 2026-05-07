/* 회원가입 API 요청 타입 */
export interface SignupRequest{
    loginId: string
    password: string
    passwordConfirm: string
    name: string
    email: string
    age: number
    part: string
}

/* 회원가입 폼 상태 타입 */
export interface SignupForm {
    loginId: string
    password: string
    passwordConfirm: string
    name: string
    email: string
    age: string
    part: string
}