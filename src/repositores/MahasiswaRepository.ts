import { MahasiswaResponse } from '$entities/Mahasiswa';
import { prisma } from '$utils/prisma.utils';

async function getByNAMA(NAMA: string): Promise<MahasiswaResponse | null> {
  const result = await prisma.mahasiswa.findUnique({ where: { NAMA } });
  return result;
}

async function getByNIM(NIM: string): Promise<MahasiswaResponse | null> {
  const result = await prisma.mahasiswa.findFirst({ where: { NIM } });
  return result;
}

async function getByYMD(YMD: Date): Promise<MahasiswaResponse | null> {
  const result = await prisma.mahasiswa.findFirst({ where: { YMD } });
  return result;
}

const mahasiswaRepository = {
  getByNIM,
  getByNAMA,
  getByYMD,
};

export default mahasiswaRepository;
