import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DecksService } from './decks.service';
import { CreateDeckDto } from './dto/create-deck.dto';
import { UpdateDeckDto } from './dto/update-deck.dto';
import { text } from 'stream/consumers';

@Controller('decks')
export class DecksController {
  constructor(private readonly decksService: DecksService) {}

  @Post()
  create(@Body() createDeckDto: CreateDeckDto) {
    return this.decksService.create(createDeckDto);
  }

  @Get()
  findAll() {
    return this.decksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.decksService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDeckDto: UpdateDeckDto) {
    return this.decksService.update(id, updateDeckDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.decksService.remove(id);
  }

  @Post(':deckId/cards')
  createCardInDeck(
    @Param('deckId') deckId: string,
    @Body() requestBody: { text: string },
  ) {
    return this.decksService.createCardInDeck(deckId, requestBody);
  }

  @Delete(':deckId/cards/:cardsIndex')
  deleteCardInDeck(
    @Param('deckId') deckId: string,
    @Param('cardsIndex') cardsIndex: string,
  ) {
    return this.decksService.deleteCardInDeck(deckId, cardsIndex);
  }
}
