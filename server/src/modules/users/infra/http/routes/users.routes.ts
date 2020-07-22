import { Router } from 'express';
import multer from 'multer';

// config
import uploadConfig from '@config/upload';

// middlewares
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

// Controllers
import UsersController from '../controllers/UsersController';
import UserAvatarController from '../controllers/UserAvatarController';

const usersRouter = Router();
const upload = multer(uploadConfig);
const usersController = new UsersController();
const userAvatarController = new UserAvatarController();

usersRouter.post('/', usersController.create);

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  userAvatarController.update,
);

export default usersRouter;
