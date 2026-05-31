export interface User {
    id: number;
    loginId: string;
    name: string;
    email: string;
    age: number;
    part: string;
}

export interface UpdateUserRequest {
    name: string;
    email: string;
    age: number;
}
