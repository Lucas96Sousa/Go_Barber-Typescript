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
            provider_id: '132364545641651454',
        });

        expect(appointment).toHaveProperty('id');
        expect(appointment.provider_id).toBe('132364545641651454');
    });

    it('Should not be able to create two appointments on the same time', async () => {
        const appointmentDate = new Date(2020, 7, 23, 16);

        await createAppointment.execute({
            date: appointmentDate,
            provider_id: '132364545641651454',
        });

        await expect(
            createAppointment.execute({
                date: appointmentDate,
                provider_id: '132364545641651454',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
