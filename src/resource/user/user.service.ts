import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/resource/user/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
 
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepo: Repository<UserEntity>,
    ) {}

    // 비밀번호 암호화
    async hashPassword(password: string) {
        // 첫 번째 인수 : 암호화할 비밀번호
        // 두 번째 인수 : 암호화에 사용될 salt 값, 값이 클수록 보안성이 높아지지만 암호화 시간이 길어진다.
        return await bcrypt.hash(password, 2);
    }

    // 동일 이메일 검사
    async findOneByEmail(email: string) {
        const user = await this.userRepo.findOne({
            where: { email },
            withDeleted: true, // DB에서 삭제된 정보를 포함해서 조회할 때 사용
        });

        if (user) {
            throw new BadRequestException('이미 생성된 유저입니다.');
        }

        return user;
    }

    async postJoin({ name, email, password }) {
        return await this.userRepo.save({
            name,
            email,
            password,
        });
    }
    async getUser(id: number) {
        const users = await this.userRepo.findOneBy({id});
        return users;
    }

    
}
