import { useCallback, useEffect, useState } from 'react';

import { actions as listActionCreator } from '../../bundles/list/store';
import { type List } from '../../bundles/list/lists';
import { Icon } from '../../components/common/icon/icon';
import { IconName } from '../../common/enums/icon-name.enum';
import { IconSize } from '../../common/enums/icon-size.enum';
import { useAppSelector, useAppDispatch } from '../../common/hooks/hooks';
import { Column } from '../../components/column/column';
import { NewListForm } from '../../components/new-list-form/new-list-form';
import styles from './styles.module.css';
import { ActivitiesList } from '../../components/activities/activities-list';


function MainPage() {
  const dispatch = useAppDispatch();

  const { lists, listOptions, cards } = useAppSelector((state) => ({
    lists: state.lists.lists,
    listOptions: state.lists.listOptions,
    cards: state.cards.cards
  }));

  const [isNewListCreate, setIsNewListCreate] = useState(false);
  const [isHistoryShown, setIsHistoryShown] = useState(false);

  const handleListsLoad = useCallback(async(): Promise<void> => {
    void dispatch(listActionCreator.getAll() as any);
  }, [dispatch]);

  const handleCreateNewList = useCallback(async(): Promise<void> => {
    setIsNewListCreate(true);
  }, []);

  const handleCloseCreateNewList = useCallback(async(): Promise<void> => {
    setIsNewListCreate(true);
  }, []);

  const handleShowHistory = useCallback(() => {
    setIsHistoryShown(true);
  }, []);

  const handleCloseHistory = useCallback(() => {
    setIsHistoryShown(false);
  }, []);

  const handleAddNewList = useCallback(async(newListData: Partial<List>): Promise<void> => {
    try {
      void dispatch(listActionCreator.create({name: newListData.name}) as any);
      setIsNewListCreate(false);
      handleListsLoad();
    } catch (error) {
      console.log(error)
    }
  }, [dispatch]);

  useEffect(() => {
    handleListsLoad()
  }, [handleListsLoad, cards]);

  return (
    <>
      <div className={styles.main_page}>
          <div className={styles.main_page__head}>
              <h2 className={styles.main_page__title}>My Task Board</h2>
              <div className={styles.main_page__buttons}>
                  <button
                      onClick={handleShowHistory}
                      className={styles.history__button}>
                      <Icon 
                        name={IconName.HISTORY} 
                        size={IconSize.MEDIUM}
                      />
                      History
                  </button>
                  <button
                    onClick={handleCreateNewList}
                    className={styles.create_list__button}
                  >
                    <Icon 
                      name={IconName.PLUS} 
                      size={IconSize.MEDIUM}
                    />
                    Create New List
                  </button>
              </div>
          </div>
          <div className={styles.main_page_columns}>
              {
                  lists.map((list, index) =>(
                  <Column 
                      key={list.id}
                      index={index}
                      listName={list.name}
                      cards={list.cards}
                      cardsAmount={list.cardsAmount}
                      listId={list.id}
                      listOptions={listOptions}
                  />
                  ))
              }
          </div>
      </div>
      {isNewListCreate && 
        <NewListForm 
          onCancel={handleCloseCreateNewList}
          onConfirm={handleAddNewList}
        />
      }
      { isHistoryShown && <ActivitiesList onClose={handleCloseHistory} /> }
    </>
  )
}

export { MainPage };
