import bcrypt from 'bcrypt';
import { INTERNAL_SERVER_ERROR_SERVICE_RESPONSE, ServiceResponse } from '../entities/Service';
import Logger from '$pkg/logger';
import { createAccessToken } from '$utils/jwt.utils';
import { hashPassword } from '$utils/password.utils';
import authRepository from '../repositores/AuthRepository';
import { UserLoginDTO, UserRegisterDTO } from '$entities/Auth';

async function register(userData: UserRegisterDTO): Promise<ServiceResponse<{}>> {
  try {
    const { namaLengkap, email, password } = userData;

    const existingUser = await authRepository.getByEmail(email);
    if (existingUser) {
      return {
        status: false,
        err: { message: 'Email sudah terdaftar', code: 409 },
      };
    }
    const hashedPassword = await hashPassword(password);
    const user = await authRepository.create({
      namaLengkap,
      email,
      password: hashedPassword,
    });
    const token = createAccessToken({
      id: user.id,
      email: user.email,
    });
    const { password: _password, createAt, updateAt, ...userWithoutPassword } = user;
    const result = {
      status: true,
      data: {
        token: token,
        user: userWithoutPassword,
      },
    };
    return result;
  } catch (err) {
    Logger.error(`AuthService.register : ${err}`);
    return INTERNAL_SERVER_ERROR_SERVICE_RESPONSE;
  }
}

async function login(userData: UserLoginDTO): Promise<ServiceResponse<{ token: string }>> {
  try {
    const { email, password } = userData;

    const user = await authRepository.getByEmail(email);

    if (!user) {
      return {
        status: false,
        err: { message: 'Email atau password salah', code: 401 },
      };
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return {
        status: false,
        err: { message: 'Email atau password salah', code: 401 },
      };
    }

    const token = createAccessToken({
      id: user.id,
      email: user.email,
    });

    const { password: _password, createAt, updateAt, ...userWithoutPassword } = user;

    const result = {
      status: true,
      data: {
        token: token,
        user: userWithoutPassword,
      },
    };

    return result;
  } catch (err) {
    Logger.error(`AuthService.login : ${err}`);
    return {
      ...INTERNAL_SERVER_ERROR_SERVICE_RESPONSE,
      data: undefined,
    } as ServiceResponse<{ token: string }>;
  }
}

const authService = { register, login };

export default authService;
