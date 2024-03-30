import { getAll, getByCardId } from './actions.js';
import { actions } from './slice.js';

const allActions = {
    ...actions,
    getAll,
    getByCardId
};

export { allActions as actions };
export { reducer } from './slice.js';
