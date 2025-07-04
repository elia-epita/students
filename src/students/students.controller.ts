import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentService: StudentsService) {}

  @Public()
  @Get()
  async findAll(@Query() paginationQuery: PaginationQueryDto) {
    /** manual timeout to force timeout interceptor to work */
    // await new Promise((resolve) => setTimeout(resolve, 5000));
    return this.studentService.findAll(paginationQuery);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    console.log(id, typeof id);
    return this.studentService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentService.create(createStudentDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentService.update(id, updateStudentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentService.remove(id);
  }
}
