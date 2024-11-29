import { User } from "src/users/users.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

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

    @ManyToMany(() => User, (user) => user.tasks)
    @JoinTable()
    users: User[];
}