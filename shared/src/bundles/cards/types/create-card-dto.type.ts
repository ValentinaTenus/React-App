import { TaskPriority } from '../enums/enums';

type CreateCardDto = {
    name: string;
    description?: string;
    status?: string;
    dueDate?: string;
    priority?: TaskPriority;
    listId: string;
}

export { type CreateCardDto };