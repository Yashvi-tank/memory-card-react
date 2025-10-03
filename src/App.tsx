import { useState } from "react"
import CardComp from "./components/CardComp"
import type { TCard, TCardList } from "./types/card.types"
import cards from "./data/cards.json"

const App = () => {
  //  React state
  const [gameCards, setGameCards] = useState<TCardList>(createGameCards())


  //  Called when a card is clicked. It flips exactly that card.
  const handleCardClick = (clickedCard: TCard) => {
    
    setGameCards(prev =>
      prev.map(card =>
        card.id === clickedCard.id
          ? { ...card, flipped: !card.flipped } 
          : card
      )
    )
  }

  return (
    <div className="main_section">
      <h1>Memory Game</h1>

      <div className="card_container">
        {gameCards.map((card: TCard) => (
          // We now pass the real click handler (not an empty fn)
          <CardComp key={card.id} card={card} clickProp={handleCardClick} />
        ))}
      </div>
    </div>
  )
}

// Create pairs of cards (id + id+100 so React keys stay unique)
const createGameCards = (): TCardList => {
  const pairs = (cards as TCard[]).flatMap((card) => [
    { ...card, id: card.id },          // first copy
    { ...card, id: card.id + 100 },    // second copy (unique id)
  ])
  return pairs
}


export default App
