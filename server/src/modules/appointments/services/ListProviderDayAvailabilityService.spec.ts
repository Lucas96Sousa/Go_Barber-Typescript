// import AppError from '@shared/errors/AppError';

import ListProviderDayAvailabilityService from './ListProviderDayAvailabilityService';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointments.repository';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderDayAvailability: ListProviderDayAvailabilityService;

describe('List Providers', () => {
    beforeEach(() => {
        fakeAppointmentsRepository = new FakeAppointmentsRepository();
        listProviderDayAvailability = new ListProviderDayAvailabilityService(
            fakeAppointmentsRepository,
        );
    });

    it('Should be able to list the day availability from provider', async () => {
        await fakeAppointmentsRepository.create({
            provider_id: 'user',
            user_id: '123455',
            date: new Date(2020, 8, 24, 13, 0, 0),
        });

        await fakeAppointmentsRepository.create({
            provider_id: 'user',
            user_id: '123455',
            date: new Date(2020, 8, 24, 14, 0, 0),
        });

        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 8, 24, 15).getTime();
        });

        const availability = await listProviderDayAvailability.execute({
            provider_id: 'user',
            year: 2020,
            month: 9,
            day: 24,
        });

        expect(availability).toEqual(
            expect.arrayContaining([
                { hour: 12, available: false },
                { hour: 13, available: false },
                { hour: 14, available: false },
                { hour: 15, available: false },
                { hour: 16, available: true },
                { hour: 17, available: true },
            ]),
        );
    });
});
