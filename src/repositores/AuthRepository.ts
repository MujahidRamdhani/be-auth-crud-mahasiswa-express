import { UserRegisterDTO, UserResponse } from '$entities/Auth';
import { User } from '@prisma/client';
import { prisma } from '../utils/prisma.utils';

async function create(user: UserRegisterDTO) {
  const result = await prisma.user.create({ data: user });
  return result;
}

async function getByEmail(email: string): Promise<UserResponse | null> {
  const result = await prisma.user.findUnique({ where: { email } });
  return result;
}

const authRepository = {
  create,
  getByEmail,
};

export default authRepository;
