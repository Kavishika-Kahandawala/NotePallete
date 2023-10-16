import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type DecksDocument = HydratedDocument<Decks>;

@Schema()
export class Decks {
  @Prop()
  title: string;

  @Prop()
  cards: string[];
}

export const DecksSchema = SchemaFactory.createForClass(Decks);
