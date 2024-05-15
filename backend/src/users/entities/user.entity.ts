import { Role } from "../../roles/role.enum";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text' })
  surname: string;

  @Column({ type: 'text' })
  login: string;

  @Column({ type: 'text' })
  class: string;

  @Column({ type: 'text' })
  roles?: Role[];

  @Column("int", { array: true })
  votingsIds?: number[]

  @CreateDateColumn()
  created_at: Date;
}
