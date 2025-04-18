import { Router } from 'express';
import validate from '$validations/validation';
import authController from '$controllers/rest/AuthController';
import { loginValidation, registerValidation } from '$validations/AuthValidation';

const authRoute = Router({ mergeParams: true });

authRoute.post('/register', validate(registerValidation), authController.register);
authRoute.post('/login', validate(loginValidation), authController.login);

export default authRoute;
