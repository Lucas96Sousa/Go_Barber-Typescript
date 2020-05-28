import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';

// ROUTES
import routes from './routes';

// CONFIG
import uploadConfig from './config/upload';

// DATABASE
import './database';

// ERROR
import AppError from './errors/AppError';

const app = express();

app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

app.use((err: Error, req: Request, res: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  return res.status(500).json({
    status: 'error',
    message: 'Internal server Error',
  });
});

app.listen(3000, () => {
  console.log('⚡ Server access on port http://localhost:3000');
});
