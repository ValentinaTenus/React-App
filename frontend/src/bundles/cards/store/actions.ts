import { createAsyncThunk } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '../../../framework/store/types/async-thunk-config.type.js';

import { type Card, type CreateCardDto, type UpdateCardDto } from '../types/types';

const getAll = createAsyncThunk<Card[], undefined, AsyncThunkConfig>(
    'cards',
    (_, { extra }) => {
        const { cardsApi } = extra;

        return cardsApi.getAll();
    },
);

const create = createAsyncThunk<Card, CreateCardDto, AsyncThunkConfig>(
    'cards',
    (payload, { extra }) => {
        const { cardsApi } = extra;

        return cardsApi.create(payload);
    },
);

const update = createAsyncThunk<
    Card[],
    { id: string, payload: UpdateCardDto },
     AsyncThunkConfig>(
    'cards', async ({ id, payload }, { extra }) => {
        const { cardsApi } = extra;

        const updatedCard = await  cardsApi.update(id, payload);  
        const cards = await cardsApi.getAll();

        return cards.map(card => {
            return (card.id === updatedCard.id)
                ? { ...updatedCard }
                : card
        });
    },
);

const deleteCard = createAsyncThunk<
    Card[],
    string,
    AsyncThunkConfig>(
    'cards',
    async(id , { extra }) => {
        const { cardsApi } = extra;
        const deletedCard = await  cardsApi.delete(id); 
        const cards = await cardsApi.getAll();

        return cards.filter(card => card.id !== deletedCard.id);
    },
);


export { create, deleteCard, getAll, update };
