import { useCallback, useEffect,useState,  useRef } from 'react';

import { type Card, type UpdateCardDto } from '~/bundles/cards/cards';
import { actions as cardsActionCreator } from '~/bundles/cards/store';
import { IconName, IconSize } from '~/common/enums/enums';
import { useAppDispatch, useFormattedDate, DateFormatType } from '~/common/hooks/hooks';
import { type ListOption } from '~/common/types/types';

import { CardButtonsModal } from '../card-buttons-modal/card-buttons-modal';
import { CardDetailsModal } from '../card-details-modal/card-details-modal';
import { CardForm } from '../card-form/card-form';
import { Icon } from '../common/icon/icon';
import { MoveToDropdown } from './components/components';
import styles from './styles.module.css';

type CardProperties = {
    card: Card;
    moveToOptions: ListOption[];
    onMoveTo: (cardId: string, option: ListOption) => void;
}

const CardItem: React.FC<CardProperties> = ({ card, onMoveTo, moveToOptions }) => {
  const { name, description, dueDate, priority } = card;

  const date = dueDate.split('T')[0];
  const formattedDate = useFormattedDate(date, DateFormatType.CUSTOM);
  
  const dispatch = useAppDispatch();
  const modalRef = useRef<HTMLDivElement>(null);
  const [isCardButtonsModalOpen, setIsCardButtonsModalOpen] = useState(false);
  const [isCardDetailsModalOpen, setIsCardDetailsModalOpen] = useState(false);
  const [isCardEdit, setIsCardEdit] = useState(false);

  const handleSelectOption = useCallback((option: ListOption) => {
    const cardId = card.id;
    onMoveTo(cardId, option)
  }, [onMoveTo, card]);

  const handleShowCardButtonModal = useCallback(() => {
    setIsCardButtonsModalOpen(true);
  }, [isCardButtonsModalOpen]);

  const handleShowCardDetailsModal = useCallback(() => {
    setIsCardDetailsModalOpen(true);
  }, [isCardDetailsModalOpen]);

  const handleCloseCardDetailsModal = useCallback(() => {
    setIsCardDetailsModalOpen(false);
  }, [isCardDetailsModalOpen]);

  const handleEditCard = useCallback(() => {
    setIsCardButtonsModalOpen(false);
    setIsCardDetailsModalOpen(false);
    setIsCardEdit(true);
  }, [setIsCardEdit]);

  const handleDeleteCard = useCallback(() => {
    void dispatch(cardsActionCreator.deleteCard(card.id) as any);
    setIsCardButtonsModalOpen(false);
  }, [setIsCardButtonsModalOpen]);

  const handleCancelUpdate = useCallback(() => {
    setIsCardEdit(false);
  }, [setIsCardEdit]);

  const handleConfirmUpdate = useCallback((newCardData: UpdateCardDto) => {
    void dispatch(cardsActionCreator.update({id: card.id, payload: newCardData }) as any);
    setIsCardEdit(false);
  }, [setIsCardButtonsModalOpen, dispatch]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setIsCardButtonsModalOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

    return (
      <>
        <div
          className={styles.card}>
          <div className={styles.card_header}>
            <h3 className={styles.card__title}>{name}</h3>
            <div className={styles.card__button_container}>
              <button
                  onClick={handleShowCardButtonModal}
                  className={styles.card__button}>&#x22EE;</button>
                  { isCardButtonsModalOpen && 
                    <div ref={modalRef}>
                      <CardButtonsModal
                        onEditCard={handleEditCard}
                        onDeleteCard={handleDeleteCard}
                      />
                    </div>
                  }
                </div>
          </div>
          <div
            onDoubleClick={handleShowCardDetailsModal}
            className={styles.card_body}
          >
            <p className={styles.card_description}>{description}</p>
            <div className={styles.card_date}>
              <Icon name={IconName.CALENDAR} />
              <span>{formattedDate}</span>
            </div>
            <p className={styles.card_level}
            > 
              <Icon name={IconName.CIRCLE_DOT}  size={IconSize.SMALL}/>
              {priority}</p>
          </div>
          <MoveToDropdown moveToOptions={moveToOptions} onSelect={handleSelectOption} />
      </div>
      {isCardEdit && (
        <CardForm card={card} onCancel={handleCancelUpdate} onConfirm={handleConfirmUpdate} />
      )}
      {isCardDetailsModalOpen && (
        <CardDetailsModal 
          card={card} 
          onClose={handleCloseCardDetailsModal}
          onEditCard={handleEditCard}
        />
      )}
    </>
  )
}

export { CardItem };
