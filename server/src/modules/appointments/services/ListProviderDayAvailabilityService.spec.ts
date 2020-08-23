// import AppError from '@shared/errors/AppError';

import ListProviderMonthAvailabilityService from './ListProviderMonthAvailabilityService';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointments.repository';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProvidersAvailability: ListProviderMonthAvailabilityService;

describe('List Providers', () => {
    beforeEach(() => {
        fakeAppointmentsRepository = new FakeAppointmentsRepository();
        listProvidersAvailability = new ListProviderMonthAvailabilityService(
            fakeAppointmentsRepository,
        );
    });

    it('Should be able to list the month availability from provider', async () => {});
});
