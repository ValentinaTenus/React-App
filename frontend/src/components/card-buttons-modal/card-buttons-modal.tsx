import { IconName } from '~/common/enums/icon-name.enum';
import { IconSize } from '~/common/enums/icon-size.enum';

import { Icon } from '../common/icon/icon';
import styles from './styles.module.css';

type CardButtonsModalProperties = {
    onEditCard: () => void;
    onDeleteCard: () => void;
};

const CardButtonsModal: React.FC<CardButtonsModalProperties> = ({ onEditCard, onDeleteCard }) => {
    return (
        <div className={styles.card_modal}>
            <button
                className={styles.card_modal__button}
                onClick={onEditCard}
            >
                <Icon name={IconName.EDIT} size={IconSize.MEDIUM}/>
                Edit
            </button>
            <button
                className={styles.card_modal__delete_button}
                onClick={onDeleteCard}
            >
                <Icon name={IconName.TRASH_CAN} size={IconSize.MEDIUM}/>
                Delete
            </button>
        </div>
    );
  };
  
export { CardButtonsModal };
  