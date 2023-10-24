import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Admins } from "./Admins";
import { Doctors } from "./Doctors";
import { Patients } from "./Patients";

@Entity("users", { schema: "hospital_management" })
export class Users {
  @PrimaryGeneratedColumn({ type: "int", name: "user_id" })
  userId: number;

  @Column("varchar", { name: "email", length: 100 })
  email: string;

  @Column("varchar", { name: "password", length: 255 })
  password: string;

  @Column("int", { name: "type", comment: "1:admin 2:doctor 3:patient" })
  type: number;

  @OneToMany(() => Admins, (admins) => admins.user)
  admins: Admins[];

  @OneToMany(() => Doctors, (doctors) => doctors.user)
  doctors: Doctors[];

  @OneToMany(() => Patients, (patients) => patients.user)
  patients: Patients[];
}
