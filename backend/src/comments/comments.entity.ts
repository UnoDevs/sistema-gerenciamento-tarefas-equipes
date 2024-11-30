import { Tasks } from "src/tasks/tasks.entity";
import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column()
  createdAt: Date;

  @ManyToOne(() => Tasks, (task) => task.comments, { onDelete: 'CASCADE' })
  task: Tasks;
}