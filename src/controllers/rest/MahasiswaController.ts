import { Request, Response } from 'express';
import { handleServiceErrorWithResponse, response_success } from '../../utils/response.utils';
import mahasiswaService from '$services/MahasiswaService';

async function getByNIM(req: Request, res: Response): Promise<Response> {
  const { NIM } = req.params;

  const serviceResponse = await mahasiswaService.getByNIM(NIM);

  if (!serviceResponse.status) {
    return handleServiceErrorWithResponse(res, serviceResponse);
  }

  return response_success(res, serviceResponse.data, 'Get Data Berdasarkan NIM Berhasil!');
}

async function getByNAMA(req: Request, res: Response): Promise<Response> {
  const { NAMA } = req.params;

  const serviceResponse = await mahasiswaService.getByNAMA(NAMA);

  if (!serviceResponse.status) {
    return handleServiceErrorWithResponse(res, serviceResponse);
  }

  return response_success(res, serviceResponse.data, 'Get Data Berdasarkan NAMA Berhasil!');
}

async function getByYMD(req: Request, res: Response): Promise<Response> {
  const { YMD } = req.params;

  const serviceResponse = await mahasiswaService.getByYMD(YMD);

  if (!serviceResponse.status) {
    return handleServiceErrorWithResponse(res, serviceResponse);
  }

  return response_success(res, serviceResponse.data, 'Get Data Berdasarkan YMD Berhasil!');
}

const mahasiswaController = {
  getByNIM,
  getByNAMA,
  getByYMD,
};
export default mahasiswaController;
