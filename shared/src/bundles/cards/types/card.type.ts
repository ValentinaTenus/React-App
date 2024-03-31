import { TaskPriority } from '../enums/enums';

type Card = {
    id: string;
    name: string;
    description: string;
    status: string;
    dueDate: string;
    priority: TaskPriority;
    listId: string;
    createdAt: Date;
    updatedAt: Date;
}

export { type Card };