import { DeckData } from "../App";
import { API_URL } from "./Configs";

export default async function GetDecks(): Promise<DeckData[]> {
  const res = await fetch(`${API_URL}/decks`);
  return res.json();
}