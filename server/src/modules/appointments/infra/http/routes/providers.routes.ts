import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProvidersController from '../controllers/ProvidersController';

const providersRouter = Router();
const providersController = new ProvidersController();

providersRouter.use(ensureAuthenticated);

//  appointmentsRouter.get('/', async (req, res) => {
//    const appointments = await appointmentsRepository.find();

//    return res.json(appointments);
// });

providersRouter.get('/', providersController.index);

export default providersRouter;
