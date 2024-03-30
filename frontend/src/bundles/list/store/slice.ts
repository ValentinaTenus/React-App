import { createSlice, isAnyOf } from '@reduxjs/toolkit';

import { DataStatus } from '../../../common/enums/enums.js';
import { ListOption, type ValueOf } from '../../../common/types/types.js';
import { type ListWithCards } from '../types/types.js';

import { create, deleteList, getAll, update } from './actions.js';

type State = {
    lists: ListWithCards[];
    listOptions: ListOption[];
    dataStatus: ValueOf<typeof DataStatus>;
    isLoaded: boolean;
};

const initialState: State = {
    lists: [],
    listOptions: [],
    dataStatus: DataStatus.IDLE,
    isLoaded: false,
};

const { reducer, actions, name } = createSlice({
    initialState,
    name: 'lists',
    reducers: {},
    extraReducers(builder) {
        builder.addMatcher(isAnyOf(getAll.fulfilled, create.fulfilled, deleteList.fulfilled, update.fulfilled), (state, action) => {
            state.lists = action.payload;
            state.listOptions = action.payload.map(list => ({ name: list.name, listId: list.id }));
            state.dataStatus = DataStatus.FULFILLED;
        });
    
        builder.addMatcher(isAnyOf(getAll.pending, create.pending, update.pending, deleteList.pending), (state) => {
            state.dataStatus = DataStatus.PENDING;
        });
        builder.addMatcher(isAnyOf(getAll.rejected, create.rejected, update.rejected, deleteList.rejected), (state) => {
            state.dataStatus = DataStatus.REJECTED;
        });      
    },
});

export { actions, name, reducer };
