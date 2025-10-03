import type { TCard } from "../types/card.types"
import styles from "./CardComp.module.css"

export type TCardProps = {
  clickProp: () => void    
  card: TCard               
}

const CardComp = ({ clickProp, card }: TCardProps) => {
  const handleClick = () => {
    console.log("clicked", card) 
    clickProp()                  
  }

  
  return (
    <article onClick={handleClick} className={styles.card} aria-label={card.name}>
      <img src={`/imgs/${card.image}`} alt={card.name} />
    </article>
  )
}

export default CardComp
