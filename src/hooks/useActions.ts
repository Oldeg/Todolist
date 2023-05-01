import {useTypedDispatch} from 'hooks/useTypedDispatch';
import {ActionCreatorsMapObject, bindActionCreators} from 'redux';
import {useMemo} from 'react';

export function useActions<T extends ActionCreatorsMapObject > (actions: T) {
    const dispatch = useTypedDispatch()
    return useMemo(() => {
        return bindActionCreators(actions, dispatch)
    }, [])
}