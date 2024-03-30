import { create, deleteCard, getAll, update } from './actions.js';
import { actions } from './slice.js';

const allActions = {
    ...actions,
    create,
    deleteCard,
    getAll,
    update
};

export { allActions as actions };
export { reducer } from './slice.js';
