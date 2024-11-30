import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Team } from './teams.entity';
import { Repository } from 'typeorm';
import { TeamDTO } from './DTO/teams.dto';
import { UsersService } from 'src/users/users.service';
import { ROLESCONSTANTS } from 'src/constants/role.constants';
import { ProfileDTO } from 'src/auth/auth.dto';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class TeamsService {

    constructor(
        @InjectRepository(Team)
        public readonly teamsRepository: Repository<Team>,
        public readonly usersService: UsersService,
        private readonly authService: AuthService
    ) { }


    async findById(id: number) {
        return await this.teamsRepository.findOne({
            where: { id: id },
            relations: ["members"]
        });
    }

    async createTeam(idUser: number, data: TeamDTO): Promise<Team> {

        const user = this.usersService.findOneById(idUser);

        if ((await user).role != ROLESCONSTANTS.ADMIN || (await user).role != ROLESCONSTANTS.LEADER) {
            throw new UnauthorizedException("Você não tem permissão para criar equipe")
        }

        if (((await user).role != ROLESCONSTANTS.ADMIN || (await user).role != ROLESCONSTANTS.LEADER) && (await user).teams.length >= 3) {
            throw new UnauthorizedException("Usuário já atingiu o número máximo de 3 equipes");
        }

        return this.teamsRepository.save(data);
    }

    async addMembersInTeam(idMember: number, idLeader: number): Promise<Team> {

        const leader = this.usersService.findOneById(idLeader);
        const member = this.usersService.findOneById(idMember);
        
        if (!(await leader)) {
            throw new NotFoundException("Lider não encontrado");
        }

        if (!(await member)) {
            throw new NotFoundException("Membro não encontrado");
        }

        if ((await leader).role != ROLESCONSTANTS.ADMIN || (await leader).role != ROLESCONSTANTS.LEADER) {
            throw new UnauthorizedException("Só lider ou administrador da equipe pode adicionar novos membros");
        }

        if((await member).teams.length >= 3) {
            throw new UnauthorizedException("Este usuário já atingiu o numero maximo de equipes a qual pode participar");
        }

        const team = await this.findById((await leader).id);
        const members = await this.usersService.findOneById(idMember);

        team.members.push(members);

        return this.teamsRepository.save(team);
        
    }

    async deleteMemberTeam(idTeam: number, idMember: number, idLeader: number) {
        
        const leader = this.usersService.findOneById(idLeader);
        const member = this.usersService.findOneById(idMember);
        const team = this.findById(idTeam);

        if (!(await leader)) {
            throw new NotFoundException("Lider não encontrado");
        }

        if (!(await member)) {
            throw new NotFoundException("Membro não encontrado");
        }

        if (!(await team)) {
            throw new NotFoundException("Time não encontrado");
        }

        if ((await leader).role != ROLESCONSTANTS.ADMIN || (await leader).role != ROLESCONSTANTS.LEADER) {
            throw new UnauthorizedException("Você não tem permissão para remover membro da equipe")
        }

        (await team).members = (await team).members.filter(async (memb) => {
            memb.id == (await member).id
        });

        return this.teamsRepository.save((await team));

    }

    async updateMemberTeam(idTeam: number, member: ProfileDTO, idLeader: number) {
        
        const leader = this.usersService.findOneById(idLeader);
        const team = this.usersService.findOneById(idTeam);
        const memberUpdated = this.usersService.findOneById(member.id);

        if (!(await leader)) {
            throw new NotFoundException("Lider não encontrado");
        }

        if (!(await team)) {
            throw new NotFoundException("Time não encontrado");
        }

        if (!(await memberUpdated)) {
            throw new NotFoundException("Membro não encontrado");
        }

        if ((await leader).role != ROLESCONSTANTS.ADMIN || (await leader).role != ROLESCONSTANTS.LEADER) {
            throw new UnauthorizedException("Só lider ou administrador da equipe pode atribuir papeis para os membros");
        }

        if (!(member)) {
            throw new BadRequestException("Papel de membro não definido");
        }

        return await this.authService.updateProfile(member, (await memberUpdated));

    }

    async assignRole(idMember: number, idLeader: number, role: ProfileDTO) {

        const leader = this.usersService.findOneById(idLeader);
        const member = this.usersService.findOneById(idMember);

        if (!(await leader)) {
            throw new NotFoundException("Lider não encontrado");
        }

        if (!(await member)) {
            throw new NotFoundException("Membro não encontrado");
        }

        if ((await leader).role != ROLESCONSTANTS.ADMIN || (await leader).role != ROLESCONSTANTS.LEADER) {
            throw new UnauthorizedException("Só lider ou administrador da equipe pode atribuir papeis para os membros");
        }

        if (!(role)) {
            throw new BadRequestException("Papel de membro não definido");
        }

        if (!(role.role)) {
            throw new BadRequestException("Papel de membro não pode ser vazio");
        }

        if (
            role.role != ROLESCONSTANTS.ADMIN   ||
            role.role != ROLESCONSTANTS.LEADER  ||
            role.role != ROLESCONSTANTS.DEAFULT ||
            role.role != ROLESCONSTANTS.GUEST
        ) {
            throw new BadRequestException("Papel inserido não existe no sistema, pais existentes (ADMIN,LEADER,MEMBER,GUEST)");
        }

        return await this.authService.updateProfile(role, (await member));

    }
}
