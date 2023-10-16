import { API_URL } from "./Configs";

export default async function CreateDecks(title: string) {
  const res = await fetch(`${API_URL}/decks`, {
    method: "POST",
    body: JSON.stringify({ title }),
    headers: { "Content-type": "application/json" },
  });
  return res.json();
}
