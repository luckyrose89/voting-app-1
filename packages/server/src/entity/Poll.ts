import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  Entity,
  ManyToOne
} from "typeorm";
import { PollOption } from "./PollOption";
import { User } from "./User";
@Entity()
export class Poll extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;

  @Column("text") name: string;

  @Column("timestamp", { nullable: true })
  createdAt: string;

  @ManyToOne(() => User, poll => poll.polls)
  user: Poll;

  @OneToMany(() => PollOption, option => option.poll)
  options: PollOption[];
}
