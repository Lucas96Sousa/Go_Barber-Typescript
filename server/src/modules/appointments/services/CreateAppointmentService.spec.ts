import AppError from '@shared/errors/AppError';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointments.repository';
import CreateAppointmentService from './CreateAppointmentService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointment: CreateAppointmentService;

describe('CreateAppointmentService', () => {
    beforeEach(() => {
        fakeAppointmentsRepository = new FakeAppointmentsRepository();
        createAppointment = new CreateAppointmentService(
            fakeAppointmentsRepository,
        );
    });

    it('Should be able to create a new appointment', async () => {
        const appointment = await createAppointment.execute({
            date: new Date(),
            user_id: '1232131',
            provider_id: '132364545641651454',
        });

        expect(appointment).toHaveProperty('id');
        expect(appointment.provider_id).toBe('132364545641651454');
    });

    it('Should not be able to create two appointments on the same time', async () => {
        const appointmentDate = new Date(2020, 7, 23, 16);

        await createAppointment.execute({
            date: appointmentDate,
            user_id: '1232131',
            provider_id: '132364545641651454',
        });

        await expect(
            createAppointment.execute({
                date: appointmentDate,
                user_id: '1232131',
                provider_id: '132364545641651454',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('Should not be able to create an appointments on a past date', async () => {
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 9, 10, 12).getTime();
        });

        await expect(
            createAppointment.execute({
                date: new Date(2020, 8, 10, 12),
                user_id: '1232131',
                provider_id: '132364545641651454',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
