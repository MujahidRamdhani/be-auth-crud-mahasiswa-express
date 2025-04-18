import { UserRegisterDTO } from '$entities/Auth';
import { prisma } from '../utils/prisma.utils';

async function create(user: UserRegisterDTO) {
  const result = await prisma.user.create({ data: user });
  return result;
}

async function getByEmail(email: string): Promise<any> {
  const result = prisma.user.findUnique({ where: { email } });
  return result;
}

const authRepository = {
  create,
  getByEmail,
};

export default authRepository;
