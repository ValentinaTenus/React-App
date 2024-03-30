 import { useDispatch } from 'react-redux';
import { store } from './store.package.js';

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;
const useAppDispatch: () => AppDispatch = useDispatch;

export { store, useAppDispatch, type RootState };
