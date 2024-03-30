import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Patch,
  Delete,
} from '@nestjs/common';
import { CardsService } from './cards.service';
import { type CreateCardDto, type UpdateCardDto } from './dto/dto';

@Controller('cards')
export class CardsController {
  constructor(private readonly cardService: CardsService) {}

  @Get()
  findAll() {
    return this.cardService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cardService.findOne(id);
  }

  @Post()
  create(@Body() card: CreateCardDto) {
    return this.cardService.create(card);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() cardUpdate: UpdateCardDto) {
    return this.cardService.update(id, cardUpdate);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.cardService.delete(id);
  }
}
