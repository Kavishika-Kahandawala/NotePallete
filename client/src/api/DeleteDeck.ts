import { API_URL } from "./Configs";

export default async function DeleteDesks(deckId:string){
    await fetch(`${API_URL}/decks/${deckId}`, {
      method: "DELETE",
    });
}