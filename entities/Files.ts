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
@Entity("files", { schema: "hospital_management" })
export class Files {
  @PrimaryGeneratedColumn({ type: "int", name: "file_id" })
  fileId: number;

  @Column("int", { name: "doctor_id", nullable: true })
  doctorId: number | null;

  @Column("int", { name: "patient_id", nullable: true })
  patientId: number | null;

  @Column("varchar", { name: "file", nullable: true, length: 255 })
  file: string | null;

  @ManyToOne(() => Doctors, (doctors) => doctors.files, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "doctor_id", referencedColumnName: "doctorId" }])
  doctor: Doctors;

  @ManyToOne(() => Patients, (patients) => patients.files, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "patient_id", referencedColumnName: "patientId" }])
  patient: Patients;
}
