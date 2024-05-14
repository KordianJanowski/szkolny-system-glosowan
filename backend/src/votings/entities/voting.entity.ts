import { Vote } from "src/votes/entities/vote.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Voting {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  title: string

  @Column({ type: 'text' })
  content: string

  @Column("text", { array: true })
  options: string[]

  @Column('bigint')
  expiration_time: number

  @Column('bool')
  is_visible_before_voting_end: boolean

  @CreateDateColumn()
  created_at: Date;

  @OneToMany(() => Vote, (vote) => vote.voting)
  votes: Vote[]
}
