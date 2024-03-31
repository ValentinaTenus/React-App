import { createAsyncThunk } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '~/framework/store/types/async-thunk-config.type.js';

import { type Card, type CreateCardDto, type UpdateCardDto } from '../types/types';
import { store } from '~/framework/store/store.package';

const getAll = createAsyncThunk<Card[], undefined, AsyncThunkConfig>(
    'cards',
    (_, { extra }) => {
        const { cardsApi } = extra;

        return cardsApi.getAll();
    },
);

const create = createAsyncThunk<Card[], CreateCardDto, AsyncThunkConfig>(
    'cards',
    async(payload, { extra }) => {
        const { cardsApi } = extra;

       await cardsApi.create(payload);
        
       return await cardsApi.getAll();
    },  
);

const update = createAsyncThunk<
    Card[],
    { id: string, payload: UpdateCardDto },
     AsyncThunkConfig>(
    'cards', async ({ id, payload }, { extra }) => {
        const { cardsApi } = extra;
        await  cardsApi.update(id, payload); 

        return await cardsApi.getAll();
    }
);

const deleteCard = createAsyncThunk<
    Card[],
    string,
    AsyncThunkConfig>(
    'cards',
    async(id , { extra }) => {
        const { cardsApi } = extra;
        await  cardsApi.delete(id); 

        return await cardsApi.getAll();
    },
);


export { create, deleteCard, getAll, update };
