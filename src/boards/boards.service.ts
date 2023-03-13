import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import {v1 as uuid} from 'uuid'; //version1을 쓰겠다.
import { CreateBoardDto } from './dto/create-board.dto';
import { NotFoundError } from 'rxjs';
import { BoardRepository } from './board.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './board.entity';

@Injectable()
export class BoardsService {
    constructor(
        @InjectRepository(BoardRepository)
        private boardRepository: BoardRepository,
    ){}

    async getAllBoards(): Promise<Board[]> {
        return this.boardRepository.find();
    } 
//   getAllBoards(): Board[] {
//     return this.boards;
//   }
    async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
        const {title, description} = createBoardDto;
        const board = this.boardRepository.create({
            title,
            description,
            status: BoardStatus.PUBLIC
        });
        await this.boardRepository.save(board);
        return board;
    }

//   createBoard(createBoardDto: CreateBoardDto) {
//     const {title, description} = createBoardDto;
//     const board: Board = {
//         id: uuid(),
//         title, //이름같으면 이렇게 한번에 가능
//         description,
//         status: BoardStatus.PUBLIC
//     }

//     this.boards.push(board);
//     return board;
//   }
    async getBoardById(id: number): Promise <Board> { //entity를 반환
        const found = await this.boardRepository.findOne(id);
        if(!found){
            throw new NotFoundException(`Can't find Board with id ${id}`);
        }
        return found;
    }

//   getBoardById(id: string): Board {
//     const found = this.boards.find((board)=> board.id === id);
//     if(!found){
//         throw new NotFoundException(`Can't find Board with id = ${id}`);
//     }    
//     return found;
// }

    async deleteBoard(id: number): Promise<void> {
       const result = await this.boardRepository.delete(id);
       if(result.affected === 0){ //아무것도 안지워졌을 때
            throw new NotFoundException(`Can't find board with id ${id}`)
       }
    }
//   deleteBoard(id: string): void {
//     const found = this.getBoardById(id); //해당 id글 있는지 check
//     this.boards = this.boards.filter((board)=>board.id !== found.id);
//   }

    async updateBoardStatus(id: number, status: BoardStatus): Promise<Board>{
        const board = await this.getBoardById(id);
        board.status = status;
        await this.boardRepository.save(board);
        return board;
    }

//   updateBoardStatus(id: string, status: BoardStatus): Board {
//     const board = this.getBoardById(id);
//     board.status = status;

//     return board;
//   }
}
