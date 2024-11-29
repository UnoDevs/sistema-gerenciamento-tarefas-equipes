import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Team } from './teams.entity';
import { Repository } from 'typeorm';
import { TeamDTO } from './DTO/teams.dto';
import { User } from 'src/users/users.entity';
import { UsersService } from 'src/users/users.service';
import { ROLESCONSTANTS } from 'src/constants/role.constants';

@Injectable()
export class TeamsService {

    constructor(
        @InjectRepository(Team)
        public readonly teamsRepository: Repository<Team>,
        public readonly usersService: UsersService
    ) { }

    async create(idUser: number, data: TeamDTO[]): Promise<Team[]> {

        const user = this.usersService.findOneById(idUser);

        if ((await user).role !== ROLESCONSTANTS.ADMIN || (await user).role !== ROLESCONSTANTS.LEADER) {
            throw new UnauthorizedException("Você não tem permissão para criar equipe")
        }

        if (user) {
            
        }
        if (data.length > 3) {
            throw new UnauthorizedException("Só é permitido criar no máximo 3 equipes por usuário");
        }


        const team = this.teamsRepository.create(data);
    }
}
