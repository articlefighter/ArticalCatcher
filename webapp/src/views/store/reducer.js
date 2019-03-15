import {combineReducers,createStore} from 'redux'


export const search_url = (state='https://segmentfault.com/a/1190000014627611',action)=>{
    if(action.type === 'search'){
        return action.url
    }
    return state
}

const reducers =combineReducers({
    search_url,
})

export let store = createStore(reducers)
