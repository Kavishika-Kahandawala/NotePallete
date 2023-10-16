import { DeckData } from "../App";
import { API_URL } from "./Configs";

export async function getSingleDeck(deckId: string): Promise<DeckData> {
  const res = await fetch(`${API_URL}/decks/${deckId}`);
  return res.json();
}