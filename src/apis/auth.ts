import axios from 'axios';

interface LoginPayload {
  email: string;
  password: string;
}

interface LoginResponse {
  access_token: string;
  nickname: string;
}

export const login = async (payload: LoginPayload): Promise<LoginResponse> => {
  const response = await axios.post('/users/login', payload);
  return response.data;
};
