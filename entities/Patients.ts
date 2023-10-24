import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Appointments } from "./Appointments";
import { Files } from "./Files";
import { PatientDoctor } from "./PatientDoctor";
import { Users } from "./Users";

@Index("user_id", ["userId"], {})
@Entity("patients", { schema: "hospital_management" })
export class Patients {
  @PrimaryGeneratedColumn({ type: "int", name: "patient_id" })
  patientId: number;

  @Column("int", { name: "user_id" })
  userId: number;

  @Column("varchar", { name: "name", nullable: true, length: 100 })
  name: string | null;

  @OneToMany(() => Appointments, (appointments) => appointments.patient)
  appointments: Appointments[];

  @OneToMany(() => Files, (files) => files.patient)
  files: Files[];

  @OneToMany(() => PatientDoctor, (patientDoctor) => patientDoctor.patient)
  patientDoctors: PatientDoctor[];

  @ManyToOne(() => Users, (users) => users.patients, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "userId" }])
  user: Users;
}
