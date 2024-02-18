import type { User } from '../types/user';
import http from '@/utils/request';

export function getUser(data: User) {
  return http.get<User, User>('/user/list', data);
}
