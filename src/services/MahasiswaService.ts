import { INTERNAL_SERVER_ERROR_SERVICE_RESPONSE, ServiceResponse } from '$entities/Service';
import Logger from '$pkg/logger';
import mahasiswaRepository from '../repositores/MahasiswaRepository';

async function getByNIM(NIM: string): Promise<ServiceResponse<{}>> {
  try {
    const Mahasiswa = await mahasiswaRepository.getByNIM(NIM);

    if (!Mahasiswa) {
      return {
        status: false,
        err: { message: `Mahasiswa dengan NIM ${NIM} tidak ditemukan.`, code: 404 },
      };
    }

    const result = {
      status: true,
      data: {
        Mahasiswa: Mahasiswa,
      },
    };

    return result;
  } catch (err) {
    Logger.error(`MahasiswaService.getByNIM : ${err}`);
    return INTERNAL_SERVER_ERROR_SERVICE_RESPONSE;
  }
}

async function getByNAMA(NAMA: string): Promise<ServiceResponse<{}>> {
  try {
    const Mahasiswa = await mahasiswaRepository.getByNAMA(NAMA);

    if (!Mahasiswa) {
      return {
        status: false,
        err: { message: `Mahasiswa dengan NAMA ${NAMA} tidak ditemukan.`, code: 404 },
      };
    }

    const result = {
      status: true,
      data: {
        Mahasiswa: Mahasiswa,
      },
    };

    return result;
  } catch (err) {
    Logger.error(`MahasiswaService.getByNAMA : ${err}`);
    return INTERNAL_SERVER_ERROR_SERVICE_RESPONSE;
  }
}
async function getByYMD(YMD: string): Promise<ServiceResponse<{}>> {
  try {
    const year = parseInt(YMD.substring(0, 4), 10);
    const month = parseInt(YMD.substring(4, 6), 10) - 1;
    const day = parseInt(YMD.substring(6, 8), 10);
    const YMDToDate = new Date(Date.UTC(year, month, day));
    const Mahasiswa = await mahasiswaRepository.getByYMD(YMDToDate);

    if (!Mahasiswa) {
      return {
        status: false,
        err: { message: `Mahasiswa dengan YMD ${YMD} tidak ditemukan.`, code: 404 },
      };
    }

    const result = {
      status: true,
      data: {
        Mahasiswa: Mahasiswa,
      },
    };

    return result;
  } catch (err) {
    Logger.error(`MahasiswaService.getByYMD : ${err}`);
    return INTERNAL_SERVER_ERROR_SERVICE_RESPONSE;
  }
}

const mahasiswaService = {
  getByNIM,
  getByNAMA,
  getByYMD,
};

export default mahasiswaService;
