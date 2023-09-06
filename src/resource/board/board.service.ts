import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { BoardEntity } from './entities/board.entity';
import { CreateBoardDto } from './dto/create-board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateBoardDto } from './dto/update-board.dto';
import { validate } from 'class-validator';

@Injectable()
export class BoardService {
    constructor(
        @InjectRepository(BoardEntity)
        private readonly boardRepo: Repository<BoardEntity>,
    ) {}
    
    async getAllBoards(): Promise<BoardEntity[]> {
        return await this.boardRepo.find();
    }

    async createBoard(createBoardDto:CreateBoardDto) :Promise<BoardEntity> {
        const errors = await validate(createBoardDto);
        
        if (errors.length > 0) {
            throw new BadRequestException('입력이 올바르지 않습니다.');
        }

        return await this.boardRepo.save(createBoardDto);
    }

    async deleteBoard(id: any): Promise<object> {
        const result = await this.boardRepo.delete({id});

        if (result.affected === 0) {
            throw new NotFoundException(`Can't find Board with id ${id}`)
        }

        return {"message" : `id ${id} board was successfully delete`}
    }
    async getBoardById(id: number): Promise<BoardEntity> {
        const found = await this.boardRepo.findOne({where :{id}});

        if (!found) {
            throw new NotFoundException(`Can't find Board with id ${id}`);
        }

        return found;
    }

    async updateBoardStatus(id: number, updateBoardDto: UpdateBoardDto) :Promise<BoardEntity>{
        const board = await this.getBoardById(id);

        board.title = updateBoardDto.title
        board.description = updateBoardDto.description

        await this.boardRepo.save(board);

        return board;
    }
}
