import { Router } from 'express';
import validate from '$validations/validation';
import { getByNAMA, getByNIM, getByYMD } from '$validations/MahasiswaValidation';
import { authenticate } from '$utils/jwt.utils';
import mahasiswaController from '$controllers/rest/MahasiswaController';

const mahasiswaRoute = Router({ mergeParams: true });

mahasiswaRoute.get('/mahasiswa/getByNIM/:NIM', authenticate, validate(getByNIM, 'params'), mahasiswaController.getByNIM);
mahasiswaRoute.get('/mahasiswa/getByNAMA/:NAMA', authenticate, validate(getByNAMA, 'params'), mahasiswaController.getByNAMA);
mahasiswaRoute.get('/mahasiswa/getByYMD/:YMD', authenticate, validate(getByYMD, 'params'), mahasiswaController.getByYMD);

export default mahasiswaRoute;
