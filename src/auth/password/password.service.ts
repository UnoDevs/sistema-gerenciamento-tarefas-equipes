import { Injectable } from '@nestjs/common';
import * as bcrypt from "bcrypt";

@Injectable()
export class PasswordService {

    public readonly saltRounds = 10;

    async hashPassword(plainText: string): Promise<string> {
        return await bcrypt.hash(plainText, this.saltRounds);
    }

    async comparePassword(plainText: string, hashedPassword: string): Promise<boolean> {
        return await bcrypt.compare(plainText, hashedPassword);
    }
}
