import {
    configureStore,
} from '@reduxjs/toolkit';

import { activityApi } from '~/bundles/activity/activity.js';
import { reducer as activitiesReducer } from '~/bundles/activity/store/slice.js';
import { cardsApi } from '~/bundles/cards/cards.js';
import { reducer as cardsReducer } from '~/bundles/cards/store/slice.js';
import { listsApi } from '~/bundles/list/lists.js';
import { reducer as listsReducer } from '~/bundles/list/store/slice.js';

type ExtraArguments = {
    cardsApi: typeof cardsApi;
    listsApi: typeof listsApi;
    activityApi: typeof activityApi;
}

const extraArguments: ExtraArguments =  {
    cardsApi,
    listsApi,
    activityApi
};

const store = configureStore({
    reducer: {
        cards: cardsReducer,
        lists: listsReducer,
        activities: activitiesReducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({
            thunk: {
                extraArgument: extraArguments,
            },
        });
    },
});


export { store };
