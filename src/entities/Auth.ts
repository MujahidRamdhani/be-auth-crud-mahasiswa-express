export interface UserLoginDTO {
  email: string;
  password: string;
}

export interface UserRegisterDTO {
  namaLengkap: string;
  email: string;
  password: string;
}
export interface UserRegisterDTO {
  email: string;
  password: string;
}

export function exclude<User, Key extends keyof User>(user: User, ...keys: Key[]): Omit<User, Key> {
  for (let key of keys) {
    delete user[key];
  }
  return user;
}
