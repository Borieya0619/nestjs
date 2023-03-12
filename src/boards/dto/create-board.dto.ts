import { IsNotEmpty } from "class-validator";

//게시물 생성을 위한 DTO
export class CreateBoardDto {
    @IsNotEmpty() //""로 값을 Post하면 에러를 띄움.
    title: string;

    @IsNotEmpty()
    description: string;
}