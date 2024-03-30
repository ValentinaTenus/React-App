import { type TypedUseSelectorHook, useSelector } from 'react-redux';

import { type RootState } from '../../../framework/store/store';

const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export { useAppSelector };
