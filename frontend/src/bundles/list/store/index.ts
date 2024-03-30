import { create, deleteList, getAll, update } from './actions.js';
import { actions } from './slice';

const allActions = {
    ...actions,
    create,
    deleteList,
    getAll,
    update,
};

export { allActions as actions };
export { reducer } from './slice';
