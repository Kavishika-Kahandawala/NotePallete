import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDeckDto } from './dto/create-deck.dto';
import { UpdateDeckDto } from './dto/update-deck.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Decks } from './schemas/decks.schemas';
import { Model } from 'mongoose';

@Injectable()
export class DecksService {
  constructor(@InjectModel(Decks.name) private DecksModel: Model<Decks>) {}

  async create(createDeckDto: CreateDeckDto): Promise<Decks> {
    const createdDecks = new this.DecksModel(createDeckDto);
    return createdDecks.save();
    // return 'This action adds a new deck';
  }

  async findAll(): Promise<Decks[]> {
    const decks = this.DecksModel.find().exec();
    return decks;
    // return `This action returns all decks`;
  }

  async findOne(id: string) {
    const deck = await this.DecksModel.findById(id).exec();
    if (!deck) {
      throw new NotFoundException(`Deck with ID ${id} not found`);
    }
    // return `This action returns a #${id} deck`;
    return deck;
  }

  update(id: string, updateDeckDto: UpdateDeckDto) {
    return `This action updates a #${id} deck`;
  }

  async remove(id: string): Promise<Decks> {
    const deletedDeck = this.DecksModel.findByIdAndDelete(id);
    return deletedDeck;
    // return `This action removes a #${id} deck`;
  }

  async createCardInDeck(
    deckId: string,
    requestBody: { text: string },
  ): Promise<Decks> {
    const deck = await this.DecksModel.findById(deckId).exec();
    if (!deck) {
      throw NotFoundException;
    }
    if (!deck.cards) {
      deck.cards = [];
    }
    deck.cards.push(requestBody.text);
    const res = await deck.save();
    return res;
  }

  async deleteCardInDeck(deckId: string, cardsIndex: string): Promise<Decks> {
    const deck = await this.DecksModel.findById(deckId).exec();
    if (!deck) {
      throw NotFoundException;
    }
    if (!deck.cards) {
      deck.cards = [];
    }
    deck.cards.splice(parseInt(cardsIndex), 1);
    const res = await deck.save();
    return res;
  }
}
