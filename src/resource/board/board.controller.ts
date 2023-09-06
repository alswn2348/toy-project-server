import { Body, Controller, Get, Param, Patch, Post, Req, UseGuards,Delete, ParseIntPipe } from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardEntity } from './entities/board.entity';
import { CreateBoardDto } from './dto/create-board.dto';
import { JwtServiceAuthGuard } from 'src/auth/auth/guards/jwt-service.guard';
import * as request from 'supertest';
import { UpdateBoardDto } from './dto/update-board.dto';

@Controller('board')
export class BoardController {
constructor(
    private boardService :BoardService
){}

    @UseGuards(JwtServiceAuthGuard)
    @Get()
    async getAllBoard(): Promise<object> {
        const boradList = await this.boardService.getAllBoards();
        return {
            massage:"success",
            data:boradList}
    }

    @UseGuards(JwtServiceAuthGuard)
    @Post()
    async createBoard(
        @Body() createBoardDto: CreateBoardDto
    ): Promise<object> {
        const board = await this.boardService.createBoard(createBoardDto);
        return {   
            data: board
        }
    }

    @UseGuards(JwtServiceAuthGuard)
    @Get('/:id')
    async getBoardById(@Param('id') id: number): Promise<BoardEntity> {
        return this.boardService.getBoardById(id);
    }

    @UseGuards(JwtServiceAuthGuard)
    @Delete('/:id')
    async deleteBoard(@Param('id', ParseIntPipe) id,
    ): Promise<object> {
        return this.boardService.deleteBoard(id);
    }

    @UseGuards(JwtServiceAuthGuard)
    @Patch('/:id')
    async updateBoardStatus(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateBoardDto : UpdateBoardDto
    ):Promise<BoardEntity> {
        return this.boardService.updateBoardStatus(id, updateBoardDto);
    }

}
