export interface UserRequest {
    username: string;
    email: string;
    password: string;
    otp?: number;
    isVerified?: boolean
}