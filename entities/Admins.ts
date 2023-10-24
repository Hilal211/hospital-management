import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Users } from "./Users";

@Index("user_id", ["userId"], {})
@Entity("admins", { schema: "hospital_management" })
export class Admins {
  @PrimaryGeneratedColumn({ type: "int", name: "admin_id" })
  adminId: number;

  @Column("int", { name: "user_id" })
  userId: number;

  @Column("varchar", { name: "name", nullable: true, length: 100 })
  name: string | null;

  @ManyToOne(() => Users, (users) => users.admins, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "userId" }])
  user: Users;
}
