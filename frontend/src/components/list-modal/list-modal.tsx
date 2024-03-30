import { IconName } from '~/common/enums/icon-name.enum';
import { IconSize } from '~/common/enums/icon-size.enum';

import { Icon } from '../common/icon/icon';
import styles from './styles.module.css';

type ListModalProperties = {
    onAddNewCard: () => void;
    onEditList: () => void;
    onDeleteList: () => void;
};

const ListModal: React.FC<ListModalProperties> = ({onAddNewCard, onEditList, onDeleteList}) => {
    
    return (
        <div className={styles.list_modal}>
            <button
                className={styles.list_modal__button}
                onClick={onEditList}
            >
                <Icon name={IconName.EDIT} size={IconSize.MEDIUM}/>
                Edit
            </button>
            <button
                className={styles.list_modal__button}
                onClick={onAddNewCard}
            >
                <Icon name={IconName.PLUS} size={IconSize.MEDIUM}/>
                Add New Card
            </button>
            <button
                className={styles.list_modal__button}
                onClick={onDeleteList}
            >
                <Icon name={IconName.TRASH_CAN} size={IconSize.MEDIUM}/>
                Delete
            </button>
        </div>
    );
  };
  
export { ListModal };
  