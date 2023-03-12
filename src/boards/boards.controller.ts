import { Body, Controller, Delete, Get, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { Board, BoardStatus } from './boards.model';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';

@Controller('boards')
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  @Get('/')
  getAllBoard(): Board[] {
    return this.boardsService.getAllBoards();
  }

  @Post('/')
  @UsePipes(ValidationPipe) //Validation Pipe는 nest의 기본 내장 파이프
  createBoard(@Body() createBoardDto: CreateBoardDto): Board { //express에서의 bodyparser와 같은 것.
    return this.boardsService.createBoard(createBoardDto);
}

  @Get('/:id')
  getBoardById(@Param('id') id: string): Board { //@Param() params: string[] 모든 쿼리스트링 데이터 가져오기
    return this.boardsService.getBoardById(id);
  }

  @Delete('/:id')
  deleteBoard(@Param('id') id: string): void {
    this.boardsService.deleteBoard(id);
  }

  @Patch('/:id/status')
  updateBoardStatus(@Param('id') id: string, @Body('status', BoardStatusValidationPipe) status: BoardStatus): Board {
    return this.boardsService.updateBoardStatus(id, status);
  }
}
