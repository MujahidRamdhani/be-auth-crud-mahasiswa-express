import { Request, Response } from 'express';
import { handleServiceErrorWithResponse, response_success } from '../../utils/response.utils';
import authService from '$services/AuthService';

async function register(req: Request, res: Response): Promise<Response> {
  const { namaLengkap, email, password } = req.body;

  const serviceResponse = await authService.register({ namaLengkap, password, email });

  if (!serviceResponse.status) {
    return handleServiceErrorWithResponse(res, serviceResponse);
  }

  return response_success(res, serviceResponse.data, 'Daftar berhasil!');
}

async function login(req: Request, res: Response): Promise<Response> {
  const { email, password } = req.body;
  const serviceResponse = await authService.login({ email, password });

  if (!serviceResponse.status) {
    return handleServiceErrorWithResponse(res, serviceResponse);
  }

  return response_success(res, serviceResponse.data, 'Login Berhasil!');
}

const authController = {
  register,
  login,
};
export default authController;
