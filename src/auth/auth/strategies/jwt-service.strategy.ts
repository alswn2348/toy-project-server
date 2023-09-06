import { Injectable, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

type JwtPayload = {
    id: string;
    email: string;
    name: string;
  };

@Injectable()
export class JwtServiceStrategy extends PassportStrategy(Strategy, 'jwt-service') {
    constructor(private readonly configService: ConfigService) {
        super(
            {
                
            
            //토큰 만료여부 검사
            ignoreExpiration: false,
            //클라이언트로부터 전송된 토큰 추출
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'ewfewfeqfqf322ew',
        });
    }
    
    // JWT에서 추출한 payload를 검증하고 정보를 반환합니다.
    async validate(payload: any) :Promise<JwtPayload>{
        
        return {
            id: payload.id,
            email: payload.email,
            name: payload.name,
        };
    }
}