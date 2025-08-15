import React, { useEffect, useState } from "react";
import "./App.css";
import { Plus, X } from "lucide-react";
import { Link } from "react-router-dom";
import DeleteDesks from "./api/DeleteDeck";
import GetDecks from "./api/GetDecks";
import CreateDecks from "./api/CreateDecks";
import MyCard from "./components/MyCard";

export type DeckData = {
  _id: string;
  cards: string[];
  title: string;
};

function App() {
  const [title, setTitle] = useState("");
  const [decks, setDecks] = useState<DeckData[]>([]);

  async function handleCreateDeck() {
    const deck = await CreateDecks(title);
    // Perform Optimistic Update
    setDecks((prevDecks) => [...prevDecks, deck]);
    setTitle("");
  }

  async function handleDelete(deckId: string) {
    await DeleteDesks(deckId);
    // Perform Optimistic Update
    setDecks(decks.filter((data) => data._id !== deckId));
    // ^^ Loop through the decks, filter out the one that matches the deck ID
  }

  useEffect(() => {
    const fetchData = async () => {
      const savedDecks = await GetDecks();
      setDecks(savedDecks);
    };
    fetchData();
  }, []);

  const [backendStatus, setBackendStatus] = useState("Checking backend status...");

  useEffect(() => {
    fetch("https://api-notepallete.onrender.com/", { mode: "no-cors" })
      .then(() => {
        // No response info available in no-cors mode, so just assume success
        setBackendStatus("🟢 Backend is online");
      })
      .catch(() => {
        setBackendStatus(
          "🔴 Backend is offline. 🚨 Still on cold boot. Please refresh in a bit"
        );
      });
  }, []);

  return (
    <>
      <div className=" gap-10 mx-20 my-10">
        <div className="lg:text-xl text-xl text-white "><p id="status" className="pb-5">{backendStatus}</p></div>
        <div className="lg:text-6xl text-2xl text-white font-semibold">Your Decks</div>
      </div>
      <ul className="grid lg:grid-cols-2 xl:grid-cols-3 gap-10 mx-20 my-10 lg:mx-52">
        {decks.map((data) => (
          <>
            <li
              className="block h-44 rounded-lg bg-white border-2 border-purple-600 p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]"
              key={data._id}
            >
              <div className="flex justify-end gap-4">
                <Link to={`decks/${data._id}`}>
                  <button title="Add">
                    <Plus className="text-green-400 hover:text-green-500" />
                  </button>
                </Link>

                <button title="Close" onClick={() => handleDelete(data._id)}>
                  <X className="text-red-400 hover:text-red-500" />
                </button>
              </div>
              <div className="text-gray-700">{data.title}</div>
            </li>
          </>
        ))}
      </ul>
      <form>
        {/* xl:px-96 lg:px-72 max-lg:px-20  */}
        {/* Decks */}

        <div className="mt-24 justify-center flex">
          <div className="flex items-center gap-5">
            <label
              htmlFor="deck-title"
              className="text-white text-xl font-semibold"
            >
              Deck Title
            </label>
            <textarea
              id="deck-title"
              className="border-white focus:border-blue-400 focus:outline-none border-2 rounded mb-2 py-5 px-4  md:w-96 bg-slate-500 text-gray-200"
              value={title}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                setTitle(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="flex justify-center mt-6">
          <button
            type="button"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded border-2 border-white"
            onClick={handleCreateDeck}
          >
            Create Deck
          </button>
        </div>
      </form>

      <div className="lg:fixed lg:-bottom-20 lg:right-0">
        <MyCard />
      </div>

      <div className="py-10"></div>

    </>
  );
}

export default App;
