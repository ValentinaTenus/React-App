import { useCallback, useEffect } from 'react';

import { actions as activitiesActionCreator } from '~/bundles/activity/store';
import { type Card } from '~/bundles/cards/types/types';
import { useAppDispatch, useAppSelector } from '~/common/hooks/hooks';
import { IconName } from '~/common/enums/icon-name.enum';
import { IconSize } from '~/common/enums/icon-size.enum';

import { ActivityItem } from '../activities/components/activity-item/activity-item';
import { Icon } from '../common/icon/icon';
import styles from './styles.module.css';

type CardDetailsModalProperties = {
    card: Card;
    onClose: () => void;
    onEditCard: () => void;
};

const CardDetailsModal: React.FC<CardDetailsModalProperties> = ({ card, onClose, onEditCard }) => {
    const cardDate = card?.dueDate.split('T')[0];

    const dispatch = useAppDispatch();

    const { openCardActivity } = useAppSelector(( { activities } ) => ({
        openCardActivity: activities.openCardActivity,
    }));

    const handleCardActivitiesLoad = useCallback(async(): Promise<void> => {
        void dispatch(activitiesActionCreator.getByCardId(card.id) as any);
    }, [dispatch]);

    useEffect(() => {
        handleCardActivitiesLoad()
    }, [handleCardActivitiesLoad]);

    return (
        <div className={styles.card_modal}>
            <div className={styles.modal_content}>
                <div className={styles.card_modal__header}>
                    <button
                        className={styles.card_modal__cross_button}
                        onClick={onClose}
                    >
                        <Icon name={IconName.CROSS} size={IconSize.LARGE} />
                    </button>
                </div>
                <div className={styles.modal_main_info}>
                    <div className={styles.modal_card_details}>
                        <div className={styles.modal_card_details__header} >
                            <h2 className={styles.modal_card_details__title}>{card.name}</h2>
                            <button
                                onClick={onEditCard}
                                className={styles.modal_card__edit_button}>
                                <Icon name={IconName.EDIT} size={IconSize.MEDIUM} />
                                { ' ' } Edit
                            </button>
                        </div>
                        <div className={styles.card_details_data}>
                            <div className={styles.details__item}>
                                <p className={styles.details__item_icon}>
                                    <Icon name={IconName.CIRCLE_INFO} size={IconSize.SMALL}/>
                                    Status
                                </p>
                                <p className={styles.details__item_data}>{card.status}</p>
                            </div>
                            <div className={styles.details__item}>
                                <p className={styles.details__item_icon}>
                                    <Icon name={IconName.CALENDAR} size={IconSize.SMALL}/>
                                    Due Date
                                </p>
                                <p className={styles.details__item_data}>{cardDate}</p>
                            </div>
                            <div className={styles.details__item}>
                                <p className={styles.details__item_icon}>
                                    <Icon name={IconName.TICKET} size={IconSize.SMALL}/>
                                    Priority
                                </p>
                                <p className={styles.details__item_data}>{card.priority}</p>
                            </div>
                        </div>
                        <div className={styles.card_details_description}>
                            <p className={styles.card_details_description__title}>Description</p>
                            <p className={styles.card_details_description__content}>{card.description}</p>
                        </div>
                    </div>
                    <div className={styles.modal_activity}>
                        <h2 className={styles.modal_activity__title}>Activity</h2>
                        <div className={styles.modal_activity_content}>
                            {openCardActivity.slice(0, 10).map((activity, index) => (
                                <ActivityItem
                                    key={index}
                                    activity={activity}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div> 
        </div>
    );
  };
  
export { CardDetailsModal };
  