import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Doctors } from "./Doctors";
import { Patients } from "./Patients";

@Index("doctor_id", ["doctorId"], {})
@Index("patient_id", ["patientId"], {})
@Entity("appointments", { schema: "hospital_management" })
export class Appointments {
  @PrimaryGeneratedColumn({ type: "int", name: "appointment_id" })
  appointmentId: number;

  @Column("int", { name: "patient_id", nullable: true })
  patientId: number | null;

  @Column("int", { name: "doctor_id", nullable: true })
  doctorId: number | null;

  @Column("datetime", { name: "appointment_date", nullable: true })
  appointmentDate: Date | null;

  @Column("int", {
    name: "status",
    nullable: true,
    comment: "1:scheduled, 2:cancelled, 3:completed",
    default: () => "'1'",
  })
  status: number | null;

  @ManyToOne(() => Doctors, (doctors) => doctors.appointments, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "doctor_id", referencedColumnName: "doctorId" }])
  doctor: Doctors;

  @ManyToOne(() => Patients, (patients) => patients.appointments, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "patient_id", referencedColumnName: "patientId" }])
  patient: Patients;
}
