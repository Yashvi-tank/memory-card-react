export type TCard = {
    id: number
    name: string
    image: string
    flipped: boolean
    matched: boolean
}

export type TCardList = TCard[]

export type TCardProps = {
	handleClick: () => void
	card: TCard
}