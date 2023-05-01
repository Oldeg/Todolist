import {createAsyncThunk} from '@reduxjs/toolkit';
import {authAPI} from 'api/auth-api';
import {auth, authActions} from 'features/auth';
import {handleServerAppError, handleServerNetworkError} from 'utils/error-utils';
import {appActions} from 'app';

export const initializeApp = createAsyncThunk('app/initializeApp', async (_, {dispatch}) => {
        dispatch(appActions.setStatus({status: 'loading'}))
        try {
            const res = await authAPI.me()
            if (res.data.resultCode === auth.RESULT_CODE.SUCCESS) {
                dispatch(appActions.setStatus({status: 'succeeded'}))
                dispatch(authActions.setIsLoggedIn(true))

            } else {
                handleServerAppError(dispatch, res.data)
            }

        } catch (e) {

            handleServerNetworkError(dispatch, e)

        }

    }
)