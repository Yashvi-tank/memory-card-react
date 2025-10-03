import { useEffect, useState } from "react"
import CardComp from "./components/CardComp"
import type { TCard, TCardList } from "./types/card.types"
import cards from "./data/cards.json"


const createGameCards = (): TCardList => {
  const pairs = (cards as TCard[]).flatMap((card) => [
    { ...card, id: card.id },         // first copy
    { ...card, id: card.id + 100 },   // second copy with unique id
  ])
  return pairs
}


const shuffleCards = (arr: TCardList): TCardList => {
  return [...arr].sort(() => Math.random() - 0.5)
}

export default function App() {
  // The board: 12 cards (6 pairs), shuffled
  const [gameCards, setGameCards] = useState<TCardList>(() =>
    shuffleCards(createGameCards())
  )

  
  const [flippedCards, setFlippedCards] = useState<TCard["name"][]>([])


  const handleCardClick = (clickedCard: TCard) => {
    
    if (clickedCard.matched) return
    if (clickedCard.flipped) return
    if (flippedCards.length === 2) return

    
    setGameCards((prev) =>
      prev.map((card) =>
        card.id === clickedCard.id ? { ...card, flipped: true } : card
      )
    )

    
    setFlippedCards((prev) => [...prev, clickedCard.name])
  }


  useEffect(() => {
    if (flippedCards.length !== 2) return

    const [firstName, secondName] = flippedCards

    if (firstName === secondName) {
      
      setGameCards((prev) =>
        prev.map((card) =>
          card.name === firstName ? { ...card, matched: true } : card
        )
      )
      setFlippedCards([]) 
    } else {
      
      const t = setTimeout(() => {
        setGameCards((prev) =>
          prev.map((card) =>
            flippedCards.some((n) => n === card.name)
              ? { ...card, flipped: false }
              : card
          )
        )
        setFlippedCards([]) 
      }, 1000)

      return () => clearTimeout(t)
    }
  }, [flippedCards])

  return (
    <div className="main_section">
      <h1>Memory Game</h1>
      <div className="card_container">
        {gameCards.map((card) => (
          <CardComp key={card.id} card={card} clickProp={handleCardClick} />
        ))}
      </div>
    </div>
  )
}
