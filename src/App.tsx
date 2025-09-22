import { useState } from "react"
import CardComp from "./components/CardComp"
import cards from "./data/cards.json"
import type { TCard, TCardList } from "./types/card.types"

const App = () => {
  // logging the data to the console
  const [gameCards, setGameCards] = useState<TCardList>(cards)
  console.log(gameCards)

  return (
    <div className="main_section">
      <h1>Memory Game</h1>
      <div className="card_container">
        {gameCards.map((card: TCard) => {
          return <CardComp key={card.id} />
        })}
      </div>
    </div>
  )
}

export default App
