import {ThunkDispatch} from 'redux-thunk';
import {AnyAction} from 'redux';
import {useDispatch} from 'react-redux';
import {AppRootState} from 'store/store';

export type AppDispatch = ThunkDispatch<AppRootState, unknown, AnyAction>
export const useTypedDispatch: () => AppDispatch = useDispatch