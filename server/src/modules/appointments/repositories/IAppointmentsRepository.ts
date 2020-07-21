import Appointment from '../infra/Typeorm/entities/Appointment';

export default interface IAppointmentsRepository {
  findByDate(date: Date): Promise<Appointment | undefined>;
}
