import { type SizeProp } from '@fortawesome/fontawesome-svg-core';
import {
    faCalendarAlt,
    faChevronDown,
    faPlus,
    faCircleArrowLeft,
    faHistory,
    faEdit,
    faTrashCan,
    faX,
    faCircleInfo,
    faTicket,
    faCircleDot
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IconName, IconSize } from '../../../common/enums/enums';
import { type ValueOf } from '../../../common/types/types';

const iconNameToSvgIcon = {
    [IconName.PLUS]: faPlus,
    [IconName.CALENDAR]: faCalendarAlt,
    [IconName.CHEVRON_DOWN]: faChevronDown,
    [IconName.CIRCLE_ARROW_LEFT]: faCircleArrowLeft,
    [IconName.HISTORY]: faHistory,
    [IconName.EDIT]: faEdit,
    [IconName.TRASH_CAN]: faTrashCan,
    [IconName.CROSS]: faX,
    [IconName.CIRCLE_INFO]: faCircleInfo,
    [IconName.TICKET]: faTicket,
    [IconName.CIRCLE_DOT]: faCircleDot,
};

type CalendarIconProperties = {
    name: ValueOf<typeof IconName>;
    className?: string;
    size?: SizeProp;
    color?: string;
};

const Icon: React.FC<CalendarIconProperties> = ({
    name,
    className,
    size = IconSize.LARGE,
    color,
}) => (
    <FontAwesomeIcon
        className={className as string}
        icon={iconNameToSvgIcon[name]}
        size={size}
        color={color as string}
    />
);

export { Icon };
