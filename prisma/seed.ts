import { PrismaClient } from '@prisma/client';
import { mahasiswa } from '../data/mahasiswa';

const prisma = new PrismaClient();

async function main() {
  try {
    await prisma.mahasiswa.createMany({
      data: mahasiswa,
      skipDuplicates: true,
    });
    console.log('Data berhasil dimasukkan');
  } catch (e) {
    console.error('Gagal memasukkan data', e);
  } finally {
    await prisma.$disconnect();
  }
}

main();
