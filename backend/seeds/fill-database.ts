import { type Knex } from "knex";
import { TaskPriority } from '../src/common/enums/enums';
import { DatabaseTableName, DatabaseColumnName } from '../src/common/database/enums/enums';

const deleteFromTables = async (
    trx: Knex.Transaction,
    tableNames: string[],
): Promise<void> => {
    for (const tableName of tableNames) {
        await trx(tableName).del();
    }
};

const listsSeed = [
    { name: 'To Do', createdAt: new Date(2024, 2, 15) },
    { name: 'Planned',  createdAt: new Date(2024, 3, 15) },
    { name: 'In Progress',  createdAt: new Date(2024, 5, 26) },
    { name: 'Closed', createdAt: new Date(2024, 8, 12) },
];

const cardsSeed = [
    { 
        name: "Create user",
        description: 'Create user table in database with name and password fields',
        status: 'toDo',
        dueDate: new Date(2024, 2, 28),
        priority: TaskPriority.MEDIUM,
        listId: '205b0ff0-a710-4d36-ac8b-d3e753496e92'
    },
    { 
        name: "Create crud for users",
        description: 'Create crud operations for users',
        status: 'toDo',
        dueDate: new Date(2024, 2, 29),
        priority: TaskPriority.MEDIUM,
        listId: '205b0ff0-a710-4d36-ac8b-d3e753496e92'
    },
    { 
        name: "Add list name field to lists table",
        description: 'Add list name field to lists table in database, create for this new migration',
        status: 'inProgress',
        dueDate: new Date(2024, 3, 2),
        priority: TaskPriority.HEIGHT,
        listId: '1aa4af6c-a0b5-4ac8-a328-2bebe239c804'
    },
    { 
        name: "Add modal window",
        description: 'Add modal window when user click delete button',
        status: 'planned',
        dueDate: new Date(2024, 3, 2),
        priority: TaskPriority.LOW,
        listId: 'd1861157-10e9-46c7-87f8-c241eb0f08fc'
    },
];

export async function seed(knex: Knex): Promise<void> {
    await knex.transaction(async (trx) => {
      
        await deleteFromTables(trx, [DatabaseTableName.CARDS, DatabaseTableName.LISTS]);

        // Lists

        const listsMappedSeed = listsSeed.map((list) => ({
            ...list,
        }));

        const insertedLists = await trx(DatabaseTableName.LISTS)
        .insert(listsMappedSeed)
        .returning('*');

        // Cards

        const cardsMappedSeed = cardsSeed.map((card, index) => ({
            ...card,
            [DatabaseColumnName.LIST_ID]: insertedLists[index].id,
        }));

        const insertedCards = await trx(
            DatabaseTableName.CARDS,
        )
            .insert(cardsMappedSeed)
            .returning('*');
    })

};
