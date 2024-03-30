import { createAsyncThunk } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '~/framework/store/types/async-thunk-config.type.js';

import { type Activity } from '../types/types';

const getAll = createAsyncThunk<Activity[], undefined, AsyncThunkConfig>(
    'activity',
    (_, { extra }) => {
        const { activityApi } = extra;

        return activityApi.getAll();
    },
);

const getByCardId = createAsyncThunk<Activity[], string, AsyncThunkConfig>(
    'activity',
    (payload, { extra }) => {
        const { activityApi } = extra;

        return activityApi.getByCardId(payload);
    },
);


export { getAll, getByCardId };
