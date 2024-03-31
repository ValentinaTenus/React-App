import { ChangeEvent, useCallback, useState } from 'react';

import { IconName } from '~/common/enums/icon-name.enum';
import { IconSize } from '~/common/enums/icon-size.enum';

import { Icon } from '../common/icon/icon';
import styles from './styles.module.css';

type ColumnCreatorProperties = {
  onCreateList: (name: string) => void;
};

const ColumnCreator: React.FC<ColumnCreatorProperties> = ({ onCreateList }) => {
  const [listName, setListName] = useState('');

  const handleChangeName = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setListName(event.target.value)
  }, [setListName]);

  const handleListCreate = useCallback(() => {
    onCreateList(listName);
    setListName('');
  }, [onCreateList, listName]);

  return (
    <div className={styles.column_creator}>
        <input
            className={styles.column_creator__input}
            type="text"
            value={listName}
            onChange={handleChangeName}
            autoFocus
        />
        <button
            className={styles.column_creator__button}
            onClick={handleListCreate}
            disabled={listName === ''? true: false}
        >
            <Icon name={IconName.PLUS} size={IconSize.MEDIUM}/>
            Add
        </button>
    </div>
  );
};

export { ColumnCreator };
