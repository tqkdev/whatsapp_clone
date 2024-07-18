import { LoginBodyType, LoginResType, RegisterBodyType, RegisterResType } from '@/schemaValidations/auth.schema';
import http from './http';

const authApiRequest = {
    login: (body: LoginBodyType) => http.post<LoginResType>('/api/login', body),
    register: (body: RegisterBodyType) => http.post<RegisterResType>('/api/register', body),
};

export default authApiRequest;
