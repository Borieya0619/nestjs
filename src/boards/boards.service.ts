import { Injectable, NotFoundException } from '@nestjs/common';
import { Board, BoardStatus } from './boards.model';
import {v1 as uuid} from 'uuid'; //version1을 쓰겠다.
import { CreateBoardDto } from './dto/create-board.dto';
import { NotFoundError } from 'rxjs';

@Injectable()
export class BoardsService {
  private boards: Board[] = [];

  getAllBoards(): Board[] {
    return this.boards;
  }

  createBoard(createBoardDto: CreateBoardDto) {
    const {title, description} = createBoardDto;
    const board: Board = {
        id: uuid(),
        title, //이름같으면 이렇게 한번에 가능
        description,
        status: BoardStatus.PUBLIC
    }

    this.boards.push(board);
    return board;
  }

  getBoardById(id: string): Board {
    const found = this.boards.find((board)=> board.id === id);
    if(!found){
        throw new NotFoundException(`Can't find Board with id = ${id}`);
    }    
    return found;
}

  deleteBoard(id: string): void {
    const found = this.getBoardById(id); //해당 id글 있는지 check
    this.boards = this.boards.filter((board)=>board.id !== found.id);
  }

  updateBoardStatus(id: string, status: BoardStatus): Board {
    const board = this.getBoardById(id);
    board.status = status;

    return board;
  }
}
