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
import { Users } from "./Users";
import { Files } from "./Files";
import { PatientDoctor } from "./PatientDoctor";

@Index("user_id", ["userId"], {})
@Entity("doctors", { schema: "hospital_management" })
export class Doctors {
  @PrimaryGeneratedColumn({ type: "int", name: "doctor_id" })
  doctorId: number;

  @Column("int", { name: "user_id" })
  userId: number;

  @Column("varchar", { name: "name", nullable: true, length: 100 })
  name: string | null;

  @Column("varchar", { name: "specialization", nullable: true, length: 100 })
  specialization: string | null;

  @OneToMany(() => Appointments, (appointments) => appointments.doctor)
  appointments: Appointments[];

  @ManyToOne(() => Users, (users) => users.doctors, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "userId" }])
  user: Users;

  @OneToMany(() => Files, (files) => files.doctor)
  files: Files[];

  @OneToMany(() => PatientDoctor, (patientDoctor) => patientDoctor.doctor)
  patientDoctors: PatientDoctor[];
}
