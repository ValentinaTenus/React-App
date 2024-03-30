import { createAsyncThunk } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '../../../framework/store/types/async-thunk-config.type.js';

import { List, type ListWithCards } from '../types/types';

const getAll = createAsyncThunk<ListWithCards[], undefined, AsyncThunkConfig>(
    'lists',
    async(_, { extra }) => {
        const { listsApi } = extra;
   
        return listsApi.getAll();
    },
);

const create = createAsyncThunk<
    ListWithCards[], Partial<List>, AsyncThunkConfig>(
    'lists',
    async(payload, { extra }) => {
        const { listsApi } = extra;
   
        const newList = await listsApi.create(payload);
        const lists = await listsApi.getAll();

        return [...lists, newList]
    },
);

const update = createAsyncThunk<
    ListWithCards[], { id: string, payload: Partial<List> }, AsyncThunkConfig>(
    'lists',
    async({ id, payload }, { extra }) => {
        const { listsApi } = extra;
        
        const updatedList = await  listsApi.update(id, payload);  
        const lists = await listsApi.getAll();

        return lists.map(list => {
            return (list.id === updatedList.id)
                ? { ...updatedList }
                : list
        });
    },
);

const deleteList = createAsyncThunk<
    ListWithCards[], string, AsyncThunkConfig>(
    'lists',
    async(id, { extra }) => {
        const { listsApi } = extra;

        const deletedList = await listsApi.delete(id); 
        const lists = await listsApi.getAll();

        return lists.filter(list => list.id !== deletedList.id);
    },
);

export { create, deleteList, getAll, update };
