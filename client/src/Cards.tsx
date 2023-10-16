import { useEffect, useState } from "react";
import "./App.css";
import { Link, useParams } from "react-router-dom";
import CreateCards from "./api/CreateCards";
import { DeckData } from "./App";
import { getSingleDeck } from "./api/GetSingleDeck";
import { ChevronLeft, X } from "lucide-react";
import DeleteSingleCards from "./api/DeleteSingleCard";
import MyCard from "./components/MyCard";

function Cards() {
  const [text, setText] = useState("");
  const [cards, setCards] = useState<string[]>([]);
  const { deckId } = useParams();
  // const [deck, setDeck] = useState<DeckData | undefined>();
  const [deck, setDeck] = useState<DeckData | undefined>();

  async function handleCreateCards() {
    const { cards: serverCards } = await CreateCards(deckId!, text);
    setCards(serverCards);
    setText("");
  }

  async function handleDelete(index: number) {
    if (!deckId) return;
    const newDeck = await DeleteSingleCards(deckId, index);
    // Perform Optimistic Update
    setCards(newDeck.cards);
    // ^^ Loop through the decks, filter out the one that matches the deck ID
  }

  useEffect(() => {
    async function fetchSingleDeck() {
      if (!deckId) return;
      const newDeck = await getSingleDeck(deckId);
      setDeck(newDeck);
      setCards(newDeck.cards);
    }
    fetchSingleDeck();
  }, [deckId]);

  return (
    <>
      <div className=" gap-10 mx-20 my-10">
        <div className="lg:text-6xl text-2xl text-white font-semibold">
          <div className="flex items-center">
            <Link to={"/"}>
              <ChevronLeft className="w-12 h-12 text-9xl mr-10" />
            </Link>
            Your Cards
          </div>
        </div>
      </div>
      <ul className="grid lg:grid-cols-2 xl:grid-cols-3 gap-10 mx-20 my-10 lg:mx-52">
        {cards.map((data, index) => (
          <>
            <li
              className="block h-44 rounded-lg bg-white border-2 border-purple-600 p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]"
              key={index}
            >
              <div className="flex justify-end gap-4">
                <button title="Close" onClick={() => handleDelete(index)}>
                  <X className="text-red-400 hover:text-red-500" />
                </button>
              </div>
              <div className="text-gray-700">{data}</div>
            </li>
          </>
        ))}
      </ul>
      <form>
        <div className="mt-24 justify-center flex">
          <div className="flex items-center gap-5">
            <label
              htmlFor="card-text"
              className="text-white text-xl font-semibold"
            >
              Card Text
            </label>
            <textarea
              id="card-text"
              className="border-white focus:border-blue-400 focus:outline-none border-2 rounded mb-2 py-5 px-4  md:w-96 bg-slate-500 text-gray-200"
              value={text}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                setText(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="flex justify-center mt-6">
          <button
            type="button"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded border-2 border-white"
            onClick={handleCreateCards}
          >
            Create Cards
          </button>
        </div>
      </form>
      <div className="py-10"></div>

      <div className="lg:fixed lg:-bottom-20 lg:right-0">
        <MyCard />
      </div>
    </>
  );
}

export default Cards;
