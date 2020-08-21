import { Router } from 'express';
import multer from 'multer';

// config
// import uploadConfig from '@config/upload';

// middlewares
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

// Controllers
import ProfileController from '../controllers/ProfileController';

const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.use(ensureAuthenticated);

profileRouter.put('/', profileController.update);

export default profileRouter;
