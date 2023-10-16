import { DeckData } from "../App";
import { API_URL } from "./Configs";

export default async function DeleteSingleCards(
  deckId: string,
  index: number
): Promise<DeckData> {
  const res = await fetch(`${API_URL}/decks/${deckId}/cards/${index}`, {
    method: "DELETE",
  });
  return res.json();
}
