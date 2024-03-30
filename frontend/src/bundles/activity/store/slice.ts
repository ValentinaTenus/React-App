import { createSlice, isAnyOf } from '@reduxjs/toolkit';

import { DataStatus } from '../../../common/enums/enums.js';
import { type ValueOf } from '../../../common/types/types.js';
import { type Activity } from '../activity.js';

import {  getAll, getByCardId } from './actions.js';

type State = {
    activities: Activity[];
    openCardActivity: Activity[];
    dataStatus: ValueOf<typeof DataStatus>;
    isLoaded: boolean;
};

const initialState: State = {
    activities: [],
    openCardActivity: [],
    dataStatus: DataStatus.IDLE,
    isLoaded: false,
};

const { reducer, actions, name } = createSlice({
    initialState,
    name: 'activity',
    reducers: {},
    extraReducers(builder) {
        builder.addMatcher(isAnyOf(getAll.pending, getByCardId.pending), (state) => {
            state.dataStatus = DataStatus.PENDING;
        });
        builder.addMatcher(isAnyOf(getAll.fulfilled), (state, action) => {
            state.activities = action.payload;
            state.dataStatus = DataStatus.FULFILLED;
        });
        builder.addMatcher(isAnyOf(getByCardId.fulfilled), (state, action) => {
            state.openCardActivity = action.payload;
            state.dataStatus = DataStatus.FULFILLED;
        });
        builder.addMatcher(isAnyOf(getAll.rejected, getByCardId.rejected), (state) => {
            state.dataStatus = DataStatus.REJECTED;
        });
    },
});

export { actions, name, reducer };
