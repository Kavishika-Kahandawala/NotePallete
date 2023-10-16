import { API_URL } from "./Configs";

export default async function CreateCards(deckId:string,text: string) {
  const res = await fetch(`${API_URL}/decks/${deckId}/cards`, {
    method: "POST",
    body: JSON.stringify({ text }),
    headers: { "Content-type": "application/json" },
  });
  return res.json();
}
