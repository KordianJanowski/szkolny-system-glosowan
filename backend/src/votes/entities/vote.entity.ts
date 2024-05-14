import { Voting } from "src/votings/entities/voting.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Vote {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("int")
  option: number

  @ManyToOne(() => Voting, (voting) => voting.votes)
  voting: Voting

  @CreateDateColumn()
  created_at: Date;
}
