import { Body, Controller, Get, Param, ParseIntPipe, Post, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LocalServiceAuthGuard } from 'src/auth/auth/guards/local-service.guard';
import { AuthService } from 'src/auth/auth/auth.service';

@Controller('user')
export class UserController {
    constructor(
        private userService: UserService,
        private authService: AuthService,
        ) { }

    @Get(':id')
    async getUser(@Param('id', ParseIntPipe) id: number) {
        return await this.userService.getUser(id);
    }

    @Post('join')
    async postJoin(
        @Body() createUserDto:CreateUserDto
    ) {
        await this.userService.findOneByEmail(createUserDto.email);

        const hashPassword = await this.userService.hashPassword(createUserDto.password);
        createUserDto.password = hashPassword;

        return await this.userService.postJoin(createUserDto);
    }

    @UseGuards(LocalServiceAuthGuard)
    @Post('login')
    async postLogin(@Req() req) {
        const token = this.authService.loginServiceUser(req.user);
        // validate() 반환값이 req의 프로퍼티로 추가됩니다.
        return token;
    }
}
