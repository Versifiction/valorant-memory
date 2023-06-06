import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import getAgentsIcons from "../../utils/getAgentsIcons";

function Board() {
  const [cards, setCards] = useState([]);
  const [foundCards, setFoundCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [attempts, setAttempts] = useState(0);
  const [isGameWon, setIsGameWon] = useState(false);
  const [time, setTime] = useState(0);

  const minutes = Math.floor((time % 360000) / 6000);
  const seconds = Math.floor((time % 6000) / 100);
  const milliseconds = time % 100;

  const { isLoading, isError, data, error, refetch } = useQuery(
    ["getAgentsIcons"],
    getAgentsIcons
  );

  function shuffle(array) {
    const newArray = [...array];

    newArray.reverse().forEach((item, index) => {
      const j = Math.floor(Math.random() * (index + 1));
      [newArray[index], newArray[j]] = [newArray[j], newArray[index]];
    });

    return newArray;
  }

  function flipCard(cardIndex, cardName) {
    if (flippedCards.length < 2) {
      setFlippedCards((flippedCards) => [
        ...flippedCards,
        { index: cardIndex, name: cardName },
      ]);
    }
  }

  function initializeBoard() {
    if (data) {
      const cardsArray = [];

      const isPlayableCharacterArray = data.data.data.filter(
        (d) => d.isPlayableCharacter
      );

      for (let i = 0; i < 2; i++) {
        isPlayableCharacterArray.forEach((d) => {
          cardsArray.push({
            background: d.background,
            icon: d.displayIconSmall,
            id: d.uuid,
            name: d.displayName,
          });
        });
      }

      setCards(shuffle(cardsArray));
    }
  }

  function restartGame() {
    setTime(0);
    setIsGameWon(false);
    setAttempts(0);
    setFlippedCards([]);
    setFoundCards([]);

    initializeBoard();
  }

  useEffect(() => {
    let intervalId;

    if (!isGameWon) {
      intervalId = setInterval(() => setTime(time + 1), 10);
    }

    return () => clearInterval(intervalId);
  }, [time]);

  useEffect(() => {
    if (
      flippedCards.length === 2 &&
      flippedCards[0].name !== flippedCards[1].name
    ) {
      setTimeout(() => {
        setFlippedCards([]);
      }, 1000);

      setAttempts((a) => a + 1);
    }

    if (
      flippedCards.length === 2 &&
      flippedCards[0].name === flippedCards[1].name
    ) {
      setFoundCards((foundCards) => [
        ...foundCards,
        { index: flippedCards[0].index, name: flippedCards[0].name },
        { index: flippedCards[1].index, name: flippedCards[1].name },
      ]);
      setFlippedCards([]);
      setAttempts((a) => a + 1);
    }
  }, [flippedCards]);

  useEffect(() => {
    if (foundCards.length > 0 && foundCards.length === cards.length) {
      setIsGameWon(true);
    }
  }, [foundCards]);

  useEffect(() => {
    initializeBoard();
  }, [data]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error</p>;
  }

  return (
    <>
      {!isGameWon ? (
        <p className="text-[#F5FFC2] mb-10">
          Nombre d'essais : <span className="font-bold">{attempts}</span> /
          Temps :{" "}
          <span className="font-bold">
            {minutes.toString().padStart(2, "0")}:
            {seconds.toString().padStart(2, "0")}:
            {milliseconds.toString().padStart(2, "0")}
          </span>
        </p>
      ) : (
        <div className="flex justify-center items-center flex-col mb-10">
          <p className="text-[#F5FFC2] text-3xl mb-10">
            Bravo, vous avez gagné en&nbsp;
            <span className="font-bold">{attempts}</span> essais et en&nbsp;
            <span className="font-bold">
              {minutes.toString().padStart(2, "0")}:
              {seconds.toString().padStart(2, "0")}:
              {milliseconds.toString().padStart(2, "0")}
            </span>{" "}
            !
          </p>
          <button className="bg-[#F5FFC2] p-4 rounded" onClick={restartGame}>
            Rejouer
          </button>
        </div>
      )}
      <div className="bg-[#D9D9D9] flex flex-wrap rounded max-w-[672px]">
        {cards?.map((card, index) => (
          <div className="relative w-24 h-24" key={index}>
            {flippedCards.map((c) => c.index).includes(index) ||
            foundCards.map((c) => c.index).includes(index) ? (
              <img
                src={card.icon}
                className="w-full h-full z-10 border-[1px] border-black cursor-pointer"
              />
            ) : (
              <div
                className="absolute bg-[#fff] z-20 w-full h-full border-[1px] border-[#D9D9D9] top-0 cursor-pointer"
                onClick={() => flipCard(index, card.name)}
              ></div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default Board;
