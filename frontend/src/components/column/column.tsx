import { useCallback, useEffect, useState, useRef } from 'react';

import { useDebouncedFunction } from '../../common/hooks/hooks';
import { type Card } from '../../bundles/cards/cards';
import { CreateCardDto } from '../../bundles/cards/types/types';
import { type ListOption } from '../../common/types/list-options';
import { useAppDispatch } from '../../common/hooks/hooks';
import { AddNewCard } from '../add-new-card/add-new-card';
import { CardForm } from '../card-form/card-form';
import { CardList } from '../card-list/card-list';
import { actions  as listsActionCreator } from '../../bundles/list/store';
import { actions as cardsActionCreator } from '../../bundles/cards/store';
import { ListModal } from '../list-modal/list-modal';
import styles from './styles.module.css';

type ColumnProps = {
  listId: string;
  listName: string;
  listOptions: ListOption[];
  cards: Card[];
  cardsAmount: number;
  index: number;
};

const Column: React.FC<ColumnProps> = ({ listId, listOptions, listName, cards, cardsAmount }) => {
  const dispatch = useAppDispatch();
  const [isCreatingCard, setIsCreatingCard] = useState(false);
  const [isListModalOpen, setIsListModalOpen] = useState(false);
  const [isListEdit, setIsListEdit] = useState(false);
  const [newListName, setNewListName] = useState(listName);

  const modalRef = useRef<HTMLDivElement>(null);

  const handleCardCreate = useCallback(() => {
    setIsCreatingCard(true);
  }, []);

  const handleConfirmCreate = useCallback((newCardData: Partial<CreateCardDto>) => {
    const { name, description, dueDate, priority } = newCardData;

    if(name ){
        void dispatch(cardsActionCreator.create({ 
          name, description, dueDate, priority, listId, status: listName 
        }) as any);
        setIsCreatingCard(false);
    }
  }, [dispatch]);

  const handleCancelCreate = useCallback(() => {
    setIsCreatingCard(false);
  }, []);

  const handleShowListModal = useCallback(() => {
    setIsListModalOpen(true);
  }, []);
  
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setIsListModalOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const updateListName = useDebouncedFunction((name: string) => {
      void dispatch(listsActionCreator.update({ id: listId, payload: {name} }) as any);
  }, 500); 

  const handleChangeListName = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const newName = event.target.value;
    setNewListName(newName);
    updateListName(newName);
  }, []);

  const handleAddNewCard = useCallback(() => {
    setIsCreatingCard(true);
    setIsListModalOpen(false);
  }, [setIsCreatingCard, setIsListModalOpen]);

  const handleEditList = useCallback(() => {
    setIsListEdit(true);
    setIsListModalOpen(false);
  }, [setIsListEdit, setIsListModalOpen]);

  const handleDeleteList = useCallback(() => {
    void dispatch(listsActionCreator.deleteList(listId) as any);
    setIsListModalOpen(false);
  }, [setIsListModalOpen]);

  return (
    <>
      <div className={styles.column}>
        <div className={styles.column_first_block}>
          { isListEdit
            ? <input
              placeholder={newListName}
              value={newListName}
              onChange={handleChangeListName}
              className={styles.first_block__input}
              autoFocus
            />
            : <p className={styles.first_block__title}>{listName}</p>
          }
          <div className={styles.first_block__content}>
              <span 
                className={styles.first_block__cards_amount}
              >{cardsAmount}</span>
              <div className={styles.first_block__button_container}>
                <button
                  onClick={handleShowListModal}
                  className={styles.first_block__button}>&#x22EE;</button>
                { isListModalOpen && 
                  <div ref={modalRef}>
                    <ListModal
                      onAddNewCard={handleAddNewCard}
                      onEditList={handleEditList}
                      onDeleteList={handleDeleteList}
                    />
                  </div>
                }
              </div>
          </div>
        </div>
        <AddNewCard onClick={handleCardCreate} />
        {cards &&  <CardList listOptions={listOptions} cards={cards} /> }
      </div>
      {isCreatingCard && (
        <CardForm onCancel={handleCancelCreate} onConfirm={handleConfirmCreate} />
      )}
    </>
  );
};

export { Column };