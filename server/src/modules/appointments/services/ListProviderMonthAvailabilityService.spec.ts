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

    it('Should be able to list the month availability from provider', async () => {
        await fakeAppointmentsRepository.create({
            provider_id: 'user',
            user_id: '123455',
            date: new Date(2020, 8, 23, 8, 0, 0),
        });

        await fakeAppointmentsRepository.create({
            provider_id: 'user',
            user_id: '123455',
            date: new Date(2020, 8, 23, 9, 1, 0),
        });
        await fakeAppointmentsRepository.create({
            provider_id: 'user',
            user_id: '123455',
            date: new Date(2020, 8, 23, 10, 1, 0),
        });
        await fakeAppointmentsRepository.create({
            provider_id: 'user',
            user_id: '123455',
            date: new Date(2020, 8, 23, 11, 1, 0),
        });
        await fakeAppointmentsRepository.create({
            provider_id: 'user',
            user_id: '123455',
            date: new Date(2020, 8, 23, 12, 1, 0),
        });
        await fakeAppointmentsRepository.create({
            provider_id: 'user',
            user_id: '123455',
            date: new Date(2020, 8, 23, 13, 1, 0),
        });
        await fakeAppointmentsRepository.create({
            provider_id: 'user',
            user_id: '123455',
            date: new Date(2020, 8, 23, 14, 1, 0),
        });

        await fakeAppointmentsRepository.create({
            provider_id: 'user',
            user_id: '123455',
            date: new Date(2020, 8, 23, 15, 1, 0),
        });

        await fakeAppointmentsRepository.create({
            provider_id: 'user',
            user_id: '123455',
            date: new Date(2020, 8, 23, 16, 1, 0),
        });

        await fakeAppointmentsRepository.create({
            provider_id: 'user',
            user_id: '123455',
            date: new Date(2020, 8, 23, 17, 1, 0),
        });

        await fakeAppointmentsRepository.create({
            provider_id: 'user',
            user_id: '123455',
            date: new Date(2020, 8, 24, 17, 2, 0),
        });

        const availability = await listProvidersAvailability.execute({
            provider_id: 'user',
            year: 2020,
            month: 9,
        });

        expect(availability).toEqual(
            expect.arrayContaining([
                { day: 22, available: true },
                { day: 23, available: false },
                { day: 24, available: true },
                { day: 25, available: true },
            ]),
        );
    });
});
