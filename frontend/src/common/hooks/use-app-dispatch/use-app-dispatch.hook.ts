import { useDispatch } from 'react-redux';

import { type store } from '../../../framework/store/store';

const useAppDispatch: () => typeof store.dispatch = () =>
    useDispatch<typeof store.dispatch>();

export { useAppDispatch };
