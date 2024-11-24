import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/users.entity';
import { Repository } from 'typeorm';
import { jwtConstants } from './constants';
import { Request } from 'express';

@Injectable()
export class AuthGuard {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    
    const request: Request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const payload: { id: any } = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret
      });

      request["user"] = await this.userRepository.findOneBy({ id: payload.id });
    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
  
    return type === "Bearer" ? token : undefined;
  }
}
