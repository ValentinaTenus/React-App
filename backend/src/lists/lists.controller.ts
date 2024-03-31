import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Patch,
  Delete,
} from '@nestjs/common';
import { ListsService } from './lists.service';
import { type CreateListDto, type UpdateListDto } from './types/types';

@Controller('lists')
export class ListsController {
  constructor(private readonly listsService: ListsService) {}

  @Get()
  findAll() {
    return this.listsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.listsService.findOne(id);
  }

  @Post()
  create(@Body() card: CreateListDto) {
    return this.listsService.create(card);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() listUpdate: UpdateListDto) {
    return this.listsService.update(id, listUpdate);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.listsService.delete(id);
  }
}
