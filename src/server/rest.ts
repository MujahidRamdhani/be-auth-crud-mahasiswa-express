import express from 'express';
import cors from 'cors';
import morganMiddleware from '$middlewares/morganMiddleware';

export default function createRestServer() {
  let allowedOrigins: string[] = ['http://localhost:3000'];

  if (process.env.ENVIRONMENT !== 'dev' && process.env.ALLOWED_ORIGINS) {
    allowedOrigins = process.env.ALLOWED_ORIGINS.split(',');
  }

  const corsOptions: cors.CorsOptions = {
    origin: allowedOrigins,
    credentials: true,
  };
  const app = express();
  app.use(cors(corsOptions));
  app.use(morganMiddleware);
  app.use(express.json());

  return app;
}
