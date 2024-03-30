import { FormEvent, useCallback, useState } from 'react';

import { type Card, type CreateCardDto } from '~/bundles/cards/types/types';
import { TaskPriority } from '~/bundles/cards/enums/enums';

import styles from './styles.module.css';

type CardFormProperties = {
    card?: Card;
    onCancel: () => void;
    onConfirm: (newCardData: Partial<CreateCardDto>) => void;
};

const CardForm: React.FC<CardFormProperties> = ({ card, onCancel, onConfirm }) => {
    const cardDate = card?.dueDate.split('T')[0];
    const today = new Date().toISOString().split('T')[0];
    const [name, setName] = useState(card?.name);
    const [description, setDescription] = useState(card?.description);
    const [dueDate, setDueDate] = useState(cardDate || today);
    const [priority, setPriority] = useState(card?.priority || 'low');
  
    const handleNameChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
      setName(event.target.value);
    }, [setName, name]);
  
    const handleDescriptionChange = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
      setDescription(event.target.value);
    }, [setDescription, description]);
  
    const handleDueDateChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
      setDueDate(event.target.value);
    }, [setDueDate, dueDate]);
  
    const handlePriorityChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
      setPriority(event.target.value);
    },[setPriority, priority]);
  
    const handleSubmit = useCallback((event: FormEvent<HTMLButtonElement>) => {
        event.preventDefault();
        const newCardData = {
            name: name,
            description: description,
            dueDate: dueDate,
            priority: priority,
        };
        onConfirm(newCardData);
        setName('');
        setDescription('');
        setDueDate('');
        setPriority('');
    }, [name, description, dueDate, priority, onConfirm]);
  
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
                    <label
                        className={styles.form__label}
                    >Due Date:</label>
                    <input
                        className={styles.form__input}
                        type="date" 
                        value={dueDate} 
                        onChange={handleDueDateChange} />
                    <label
                        className={styles.form__label}
                    >Priority:</label>
                    <select
                        className={styles.form__input}
                        value={priority} 
                        onChange={handlePriorityChange}>
                        <option value='low'>{TaskPriority.LOW}</option>
                        <option value='medium'>{TaskPriority.MEDIUM}</option>
                        <option value='height'>{TaskPriority.HEIGHT}</option>
                    </select>
                    <label
                        className={styles.form__label}  
                    >Description:</label>
                    <textarea
                        className={styles.form__textarea}
                        value={description} 
                        onChange={handleDescriptionChange} />
                    <button
                        type='button'
                        className={styles.submit__button}
                        onClick={handleSubmit}
                    >Save</button>
                    <button
                        className={styles.cancel__button}
                        onClick={onCancel}
                    >Cancel</button>
                </form>
            </div>
        </div>
    );
  };
  
export { CardForm };
  