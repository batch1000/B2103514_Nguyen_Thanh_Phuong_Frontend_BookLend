import { apiService } from '../api.service';

export const loginService = {
  async login(data) {
    return apiService.post('auth/login', data);
  },
};
