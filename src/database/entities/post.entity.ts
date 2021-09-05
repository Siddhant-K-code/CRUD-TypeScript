import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('tasks')
export class PostEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column()
  content!: string;
}