import {combineReducers,createStore} from 'redux'

// https://segmentfault.com/a/1190000014627611
export const search_url = (state='',action)=>{
    if(action.type === 'search'){
        return action.url
    }
    return state
}

const reducers =combineReducers({
    search_url,
})

export let store = createStore(reducers)
