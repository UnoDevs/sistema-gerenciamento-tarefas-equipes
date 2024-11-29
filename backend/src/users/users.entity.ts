import { Team } from "src/teams/teams.entity";
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

    @Column()
    role: string;

    @ManyToMany(() => Team, (teams) => teams.members)
    teams: Team[];

    @ManyToMany(() => Tasks, (tasks) => tasks.users)
    tasks: Tasks[];

}