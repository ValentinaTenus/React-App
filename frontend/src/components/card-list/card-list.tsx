import { useCallback } from "react";

import { type Card } from '~/bundles/cards/cards';
import { actions as cardActionCreator } from '~/bundles/cards/store';
import { useAppDispatch } from '~/common/hooks/hooks';
import { type ListOption } from '~/common/types/list-options';

import { CardItem } from '../card-item/card-item';
import styles from './styles.module.css';

type CardListProperties = {
    cards: Card[];
    listOptions: ListOption[]
}

const CardList: React.FC<CardListProperties> = ({ cards, listOptions }) => {
  const dispatch = useAppDispatch();
  
  const handleMoveTo = useCallback(async (cardId: string, option: ListOption): Promise<void> => {
    const payload =  { status: option.name, listId: option.listId }
    void dispatch(cardActionCreator.update({ id: cardId, payload }) as any)
  }, [dispatch]);
  
  return (
    <div className={styles.cards_list}>
      {cards.map((card, index) => (
        <CardItem
          key={index}
          card={card}
          moveToOptions={listOptions}
          onMoveTo={handleMoveTo}
        />
      ))}
    </div>
  );
};

export { CardList };