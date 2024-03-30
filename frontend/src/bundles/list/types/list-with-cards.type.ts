import { type Card } from "../../cards/cards";

type ListWithCards = {
    id: string;
    name: string;
    cards: Card[];
    cardsAmount: number;
};

export { type ListWithCards };
