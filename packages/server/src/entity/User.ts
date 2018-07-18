import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  BeforeInsert,
  OneToMany
} from "typeorm";
import * as bcrypt from "bcryptjs";
import { Poll } from "./Poll";
@Entity("users")
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid") id: string;

  @Column("varchar", { length: 255, nullable: true })
  email: string | null;

  @Column("text", { nullable: true })
  password: string;

  @Column("text", { nullable: true })
  twitterId: string | null;

  @Column("text", { nullable: true })
  username: string | null;

  @OneToMany(() => Poll, poll => poll.user)
  polls: Poll[];

  @BeforeInsert()
  async hashPasswordBeforeInsert() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }
}
