import { Team } from "src/teams/teams.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn, Unique } from "typeorm";


@Entity()
@Unique(["email"])
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

    @ManyToMany(() => Team, (team) => team.members)
    teams: Team[];


}