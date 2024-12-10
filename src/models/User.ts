export interface User {
    id: number;
    username: string;
    email: string;
    password_hash: string;
    balance: number;
    role: 'client' | 'admin';
  }