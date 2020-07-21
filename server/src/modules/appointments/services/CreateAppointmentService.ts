import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

// MODEL
import Appointment from '@modules/appointments/infra/Typeorm/entities/Appointment';

// Repository
import AppointmentsRepository from '@modules/appointments/infra/Typeorm/repositories/AppointmentsRepository';

// ERROR
import AppError from '@shared/errors/AppError';

interface Request {
  provider_id: string;
  date: Date;
}
// - Dependency Inversion
class CreateAppointmentService {
  public async execute({ date, provider_id }: Request): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate) {
      throw new AppError(
        'Horário para o agendemento não está mais diponível',
        400,
      );
    }

    const appointment = appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    });

    await appointmentsRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppointmentService;
