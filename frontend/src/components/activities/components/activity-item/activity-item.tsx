import { useCallback, useEffect, useState } from 'react';

import { Activity } from '../../../../bundles/activity/activity';
import { ActivityChangeTypes } from '../../../../bundles/activity/enums/activity-change-type.enum';
import { useFormattedDate } from '../../../../common/hooks/hooks';
import { IconName } from '../../../../common/enums/icon-name.enum';
import { IconSize } from '../../../../common/enums/icon-size.enum';
import { Icon } from '../../../common/icon/icon';
import styles from './styles.module.css';

type ActivityItemProperties = {
    activity: Activity;
}

const ActivityItem: React.FC<ActivityItemProperties> = ({ activity }) => {
    const [activityOldValue, setActivityOldValue] = useState(activity.oldValue);
    const [activityNewValue, setActivityNewValue] = useState(activity.newValue);
    const formattedDate = useFormattedDate(activity.createdAt.toString());

    const handleFormatValueDate = useCallback(() => {
        if( activity.changeType === ActivityChangeTypes.CHANGED_DUE_DATE 
            || activity.changeType === ActivityChangeTypes.ADDED_DUE_DATE ){
                setActivityOldValue(activity.oldValue.split('T')[0]);
                setActivityNewValue(activity.oldValue.split('T')[0]);
            }
    },[activity]);

    useEffect(() => {
        handleFormatValueDate();
    }, [activity]);
    
    return (
        <li className={styles.activities_list__item}>
            <div className={styles.activities_list__data}>
                {'You '}
                <span>{activity.changeType.replace('_', ' ')}</span>{' '}
                <Icon name={IconName.CIRCLE_DOT} size={IconSize.SMALL}/>{' '}
                <span className={styles.activities_list__name}>{activity.cardName}</span>
                {
                    (   activity.changeType === ActivityChangeTypes.CHANGED_DESCRIPTION
                        || activity.changeType === ActivityChangeTypes.CHANGED_DUE_DATE
                        || activity.changeType === ActivityChangeTypes.CHANGED_PRIORITY
                        || activity.changeType === ActivityChangeTypes.MOVED
                        || activity.changeType === ActivityChangeTypes.RENAMED
                    ) && 
                    <>
                        <span>{ ' ' } from</span>{ ' ' }
                        <span  className={styles.activities_list__value}>{activityOldValue}</span>
                        <span>{ ' ' } to { ' ' }</span>
                        <span className={styles.activities_list__value}>{activityNewValue}</span>
                    </>
                }
                </div>
                <div className={styles.activities_list__date}>
                    {formattedDate}
                </div>
        </li>
    );
};

export { ActivityItem };