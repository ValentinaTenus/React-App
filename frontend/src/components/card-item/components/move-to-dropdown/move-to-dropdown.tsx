import { useState } from 'react';

import { IconName } from '~/common/enums/icon-name.enum';
import { IconSize } from '~/common/enums/icon-size.enum';
import { type ListOption } from '~/common/types/types';
import { Icon } from '../../../common/icon/icon';

import styles from './styles.module.css';

type MoveToProperties = {
    onSelect: (option: ListOption) => void;
    moveToOptions: ListOption[];
}

const MoveToDropdown: React.FC<MoveToProperties> = ({onSelect, moveToOptions}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: ListOption) => {
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className={styles.dropdown}>
      <div className={styles.dropdown_header} onClick={toggleDropdown}>
          Move To:
        <Icon name={IconName.CHEVRON_DOWN} size={IconSize.MEDIUM} />
      </div>
      {isOpen && (
        <ul className={styles.dropdown_menu}>
          {moveToOptions.map((option) => (
            <li
              key={option.name} 
              onClick={() => handleOptionClick(option)}>
              {option.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export { MoveToDropdown };
