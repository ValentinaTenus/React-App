import { IconName } from '~/common/enums/icon-name.enum';
import { IconSize } from '~/common/enums/icon-size.enum';

import { Icon } from '../common/icon/icon';
import styles from './styles.module.css';

type AddNewCardProperties = {
   onClick: () => void;
}

const AddNewCard: React.FC<AddNewCardProperties> = ({ onClick }) => {
    return (
        <div className={styles.add_card}>
            <button
                onClick={onClick}
                className={styles.add_card__button}
            >
                <Icon name={IconName.PLUS} size={IconSize.MEDIUM} />
                Add New Card
            </button>
        </div>
    )
}

export { AddNewCard };
