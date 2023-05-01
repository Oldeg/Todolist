import * as appSelectors from './selectors'
import * as app from './app-reducer'
import * as appAsyncActions from './appActions'

const appActions = {
    ...app.slice.actions,
    ...appAsyncActions
}
export {
    appSelectors,
    app,
    appActions
}