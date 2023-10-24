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
@Entity("patient_doctor", { schema: "hospital_management" })
export class PatientDoctor {
  @PrimaryGeneratedColumn({ type: "int", name: "patient_doctor_id" })
  patientDoctorId: number;

  @Column("int", { name: "patient_id" })
  patientId: number;

  @Column("int", { name: "doctor_id" })
  doctorId: number;

  @ManyToOne(() => Doctors, (doctors) => doctors.patientDoctors, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "doctor_id", referencedColumnName: "doctorId" }])
  doctor: Doctors;

  @ManyToOne(() => Patients, (patients) => patients.patientDoctors, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "patient_id", referencedColumnName: "patientId" }])
  patient: Patients;
}
