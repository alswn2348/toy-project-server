import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { UserEntity } from 'src/resource/user/entities/user.entity';

@Injectable()
export class LocalServiceStrategy extends PassportStrategy(Strategy, 'local-service') {
    constructor(private authService: AuthService) {
        super({
            // 로그인시 사용되는 기본 프로퍼티 변경
            usernameField: 'email',
            passwordField: 'password',
        });
    }

    async validate(email: string, password: string): Promise<UserEntity> {
        const user = await this.authService.validateServiceUser(email, password);

        if (!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}