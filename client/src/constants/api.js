import axios from 'axios';

const api = axios.create();

export const loginUrl = '/api/v1/auth/login';
export const authenticateUrl = '/api/v1/auth/authenticate';

export const usersUrl = '/api/v1/users';

export default api;
