import { Tasks } from "src/tasks/tasks.entity";
import { User } from "src/users/users.entity";
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Team {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @ManyToMany(() => User, (user) => user.tasks)
    @JoinTable()
    members: User[];

    @OneToMany(() => Tasks, (task) => task.team)
    tasks: Tasks[];

}