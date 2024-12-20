import { Comment } from "src/comments/comments.entity";
import { Team } from "src/teams/teams.entity";
import { User } from "src/users/users.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Tasks {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({default: "Nova Tarefa"})
    title: string;

    @Column()
    description: string;

    @Column()
    dueDate: Date;

    @Column({default: "Pendente"})
    status: string;

    @ManyToOne(() => Team, (team) => team.tasks)
    team: Team;

    @ManyToMany(() => User, (user) => user.tasks)
    @JoinTable()
    users: User[];

    @OneToMany(() => Comment, (comment) => comment.task, { cascade: true })
    comments: Comment[];
}