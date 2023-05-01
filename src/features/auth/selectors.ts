
import {AppRootState} from 'store/store';

export const selectorIsLoggedIn = (state:AppRootState) => state.auth.isLoggedIn