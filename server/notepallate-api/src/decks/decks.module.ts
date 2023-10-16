import { Module } from '@nestjs/common';
import { DecksService } from './decks.service';
import { DecksController } from './decks.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Decks, DecksSchema } from './schemas/decks.schemas';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Decks.name, schema: DecksSchema }]),
  ],
  controllers: [DecksController],
  providers: [DecksService],
})
export class DecksModule {}
