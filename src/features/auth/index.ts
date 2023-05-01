import * as authSelectors from './selectors'
import * as auth from './authReducer'
import * as authAsyncActions from './authActions'
const authActions = {
    ...auth.slice.actions,
    ...authAsyncActions
}
export {
    authSelectors,
    auth,
    authActions
}