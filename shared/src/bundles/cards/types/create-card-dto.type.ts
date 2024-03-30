import { TaskPriority } from '../enums/enums';
import { type ValueOf } from '~/types/value-of.type';

type CreateCardDto = {
    name: string;
    description?: string;
    status?: string;
    dueDate?: string;
    priority?: ValueOf<TaskPriority>;
    listId: string;
}

export { type CreateCardDto };