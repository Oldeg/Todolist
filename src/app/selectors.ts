import {AppRootState} from 'store/store';

export const selectInitialize =  (state:AppRootState) => state.app.initialized
export const selectStatus = (state:AppRootState) => state.app.status
export const selectError = (state: AppRootState) => state.app.error