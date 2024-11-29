import { Tasks } from "src/tasks/tasks.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
    
    @Column()
    email: string;
    
    @Column()
    password: string;

    @ManyToMany(() => Tasks, (tasks) => tasks.users)
    tasks: Tasks[];

}