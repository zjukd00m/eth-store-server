import { Request } from 'express';

export interface ILoginResponse {
    accessToken: string;
}

export interface IAuthUserData {
    wallet: string;
    confirmed?: boolean;
    email?: string;
}

export interface IAuthUserPayload {
    data: IAuthUserData;
    sub: string;
    iat: number;
}

export interface IAuthRequest extends Request {
    user: IAuthUserData;
}
