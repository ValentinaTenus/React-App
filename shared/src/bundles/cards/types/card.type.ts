import { TaskPriority } from '../enums/enums';
import { type ValueOf } from '~/types/value-of.type';

type Card = {
    id: string;
    name: string;
    description: string;
    status: string;
    dueDate: string;
    priority: ValueOf<TaskPriority>;
    listId: string;
    createdAt: Date;
    updatedAt: Date;
}

export { type Card };