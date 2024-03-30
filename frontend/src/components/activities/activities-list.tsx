import { useCallback, useEffect } from 'react';

import { actions as activitiesActionCreator } from '../../bundles/activity/store';
import { useAppSelector, useAppDispatch } from '../../common/hooks/hooks';
import { ActivityItem } from './components/activity-item/activity-item';
import { Icon } from '../common/icon/icon';
import { IconName } from '../../common/enums/icon-name.enum';
import styles from './styles.module.css';

type ActivitiesListProperties = {
  onClose: () => void;
}

const ActivitiesList: React.FC<ActivitiesListProperties> = ({ onClose }) => { 
  const dispatch = useAppDispatch();

  const { activities } = useAppSelector(( { activities } ) => ({
    activities: activities.activities,
  }));

  const handleActivitiesLoad = useCallback(async(): Promise<void> => {
    void dispatch(activitiesActionCreator.getAll() as any);
  }, [dispatch]);

  useEffect(() => {
    handleActivitiesLoad()
  }, [handleActivitiesLoad]);

  return (
    <div className={styles.activities}>
      <div className={styles.activities_header}>
          <h3>History</h3>
          <button
            onClick={onClose}
            className={styles.activities__close_button}
          >
            <Icon name={IconName.CROSS} />
          </button>
        </div>
        <div className={styles.activities_list}>
          {activities.slice(0, 10).map((activity, index) => (
              <ActivityItem
                key={index}
                activity={activity}
              />
          ))}
        </div>
    </div>
  );
};

export { ActivitiesList };