import { TaskPriority } from '../enums/enums';

type Card = {
    id: string;
    name: string;
    description: string;
    status: string;
    dueDate: string;
    priority: TaskPriority;
    createdAT: Date;
    updatedAt: Date;
    listId: string;
};

export { type Card };
