import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointments.repository';
import CreateAppointmentService from './CreateAppointmentService';

describe('CreateAppointmentService', () => {
  it('Should be able to create a new appointment', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );

    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: '132364545641651454',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('132364545641651454');
  });

  // it('Should not be able to create two appointments on the same time', () => {});
});
