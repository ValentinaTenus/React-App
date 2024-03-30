import { type store } from '../store';
import { activityApi } from '~/bundles/activity/activity.js';
import { cardsApi } from '~/bundles/cards/cards.js';
import { listsApi } from '~/bundles/list/lists.js';

const extraArguments =  {
    cardsApi,
    listsApi,
    activityApi
};

type AsyncThunkConfig = {
    state: typeof store.getState;
    dispatch: typeof store.dispatch;
    extra: typeof extraArguments;
};

export { type AsyncThunkConfig };