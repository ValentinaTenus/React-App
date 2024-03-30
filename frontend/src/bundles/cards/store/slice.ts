import { createSlice, isAnyOf } from '@reduxjs/toolkit';

import { DataStatus } from '~/common/enums/enums.js';
import { type ValueOf } from '~/common/types/types.js';

import { type Card } from '../cards.js';

import { create, deleteCard, getAll, update } from './actions.js';

type State = {
    cards: Card[];
    dataStatus: ValueOf<typeof DataStatus>;
    isLoaded: boolean;
};

const initialState: State = {
    cards: [],
    dataStatus: DataStatus.IDLE,
    isLoaded: false,
};

const { reducer, actions, name } = createSlice({
    initialState,
    name: 'cards',
    reducers: {},
    extraReducers(builder) {
        builder.addMatcher(isAnyOf(getAll.pending, create.pending, update.pending), (state) => {
            state.dataStatus = DataStatus.PENDING;
        });
        builder.addMatcher(isAnyOf(getAll.fulfilled), (state, action) => {
            state.cards = action.payload;
            state.dataStatus = DataStatus.FULFILLED;
        });
        builder.addMatcher(isAnyOf(getAll.rejected, create.rejected, update.rejected), (state) => {
            state.dataStatus = DataStatus.REJECTED;
        });
        builder.addMatcher(isAnyOf(create.fulfilled), (state, action) => {
            state.cards = [...state.cards, action.payload];
            state.dataStatus = DataStatus.FULFILLED;
        });
        builder.addMatcher(isAnyOf(update.fulfilled, deleteCard.fulfilled), (state, action) => {
            state.cards = action.payload;
            state.dataStatus = DataStatus.FULFILLED;
        });
    },
});

export { actions, name, reducer };
