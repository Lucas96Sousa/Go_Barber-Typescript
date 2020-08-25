import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProvidersController from '../controllers/ProvidersController';
import ProviderMonthAvailabiltyController from '../controllers/ProviderMonthAvailabiltyController';
import ProviderDayAvailabiltyController from '../controllers/ProviderDayAvailabiltyController';

const providersRouter = Router();
const providersController = new ProvidersController();
const providerDayAvailabilityController = new ProviderDayAvailabiltyController();
const providerMonthAvailabilityController = new ProviderMonthAvailabiltyController();

providersRouter.use(ensureAuthenticated);

providersRouter.get('/', providersController.index);
providersRouter.get(
    '/:provider_id/month-availability',
    celebrate({
        [Segments.BODY]: {
            provider_id: Joi.string().uuid().required(),
        },
    }),
    providerMonthAvailabilityController.index,
);
providersRouter.get(
    '/:provider_id/day-availability',
    celebrate({
        [Segments.BODY]: {
            provider_id: Joi.string().uuid().required(),
        },
    }),
    providerDayAvailabilityController.index,
);

export default providersRouter;
