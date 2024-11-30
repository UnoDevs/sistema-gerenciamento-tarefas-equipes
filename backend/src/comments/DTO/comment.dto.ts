import { IsString, IsNumber } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  content: string;

  @IsNumber()
  taskId: number;
}

export class UpdateCommentDto {
    @IsString()
    content: string;
}