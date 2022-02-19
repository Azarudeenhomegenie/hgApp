/*
 Every API call dispaches startAction and endAction actions to show progress bar on the top of the screen.
 This behavior can be overridden by *silent* action parameter.
 */
 import createApi from 'api/createApi'
 import { startAction, endAction } from 'myredux/modules/progressActions'
 import { showErrorSnackbar } from 'api/errorHandlers'
 
 export default function clientMiddleware(client, req, history) {
   return ({ dispatch, getState }) => {
     return next => async action => {
       if (typeof action === 'function') {
         return action(dispatch, getState, createApi(dispatch, getState, req, history))
       }
 
       const { promise, types, silent, showError, ...rest } = action // eslint-disable-line no-redeclare
       if (!promise) {
         return next(action)
       }
 
       const [REQUEST, SUCCESS, FAILURE] = types
       const isProgressbarActive = !__SERVER__ && !silent
 
       next({ ...rest, type: REQUEST })
       if (isProgressbarActive) dispatch(startAction(REQUEST))
 
       try {
         const result = await promise(client, getState)
 
         if (isProgressbarActive) dispatch(endAction(REQUEST))
 
         return next({ ...rest, result, type: SUCCESS })
       } catch (error) {
         if (isProgressbarActive) dispatch(endAction(REQUEST))
         if (showError && error) showErrorSnackbar(error, dispatch)
         const { response: { data = null } = {} } = error
         console.error('MIDDLEWARE ERROR:', JSON.stringify(error))
 
         return next({ ...rest, error: data === null ? error : data, type: FAILURE })
       }
     }
   }
 }
 