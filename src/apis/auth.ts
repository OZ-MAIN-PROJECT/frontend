import { END_POINT } from '@/constants/route';
import api from './instance';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  nickname: string;
}

export const login = async (payload: LoginPayload): Promise<LoginResponse> => {
  const response = await api.post(END_POINT.USERS_LOGIN, payload);
  return response.data;
};

export interface SignupPayload {
    name : string;
    email : string;
    password : string;
    nickname : string;
    question : string;
    answer : string;
};

export interface SignupResponse {
    code : string | number;
    message : string;
}

export const signup = async (payload : SignupPayload) : Promise<SignupResponse> => {
    const response = await api.post(END_POINT.USERS_SIGNUP, payload);
    return response.data;
}