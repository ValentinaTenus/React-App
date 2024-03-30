import { FormEvent, useCallback, useState } from 'react';

import { List } from '../../bundles/list/lists';
import styles from './styles.module.css';

type NewListFormProperties = {
    onCancel: () => void;
    onConfirm: (newListData: Partial<List>) => void;
};

const NewListForm: React.FC<NewListFormProperties> = ({ onCancel, onConfirm }) => {
    const [name, setName] = useState('');
  
    const handleNameChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
      setName(event.target.value);
    }, [setName, name]);
  
    const handleSubmit = useCallback((event: FormEvent<HTMLButtonElement>) => {
        event.preventDefault();
        const newListData = {
            name: name,
        };
        onConfirm(newListData);
        setName('');
    }, [name, onConfirm]);
  
    return (
        <div className={styles.modal}>
            <div className={styles.modal_content}>
                <span className={styles.close} onClick={onCancel}>&times;</span>
                <form
                    className={styles.form}
                >
                    <label
                      className={styles.form__label}  
                    > Name:</label>
                    <input
                        className={styles.form__input}
                        type="text" 
                        value={name} 
                        onChange={handleNameChange} />
                    <button
                        type='button'
                        className={styles.submit__button}
                        onClick={handleSubmit}
                        >Create List</button>
                    <button
                        className={styles.cancel__button}
                        onClick={onCancel}>Cancel</button>
                </form>
            </div>
        </div>
    );
  };
  
export { NewListForm };
  