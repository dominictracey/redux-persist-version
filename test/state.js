import createMigration from '../index.js'
import {compose, applyMiddleware, createStore} from 'redux';
import {autoRehydrate} from 'redux-persist';
import logger from 'redux-logger';
import {fromJS} from 'immutable'

export const initialState = {}

const manifest = {
    migrate: (state, version) => updateState(state, version),
    migrations: [
      { version: "0.0.1" },
      { version: "0.0.2" },
      { version: "0.1.0" },
    ]
}

function updateState(state, version) {
    var newState

    switch (version) {
      case '0.0.1':
        newState = state.set('todos', state.get('todos').map((i) => i.set('complete', false)))
        return newState
      case '0.0.2':
        newState = state.set('todos',state.get('todos').map((i) => i.set('assigned', 'me')))
        return newState
      case '0.1.0':
        newState = state.set('todos',state.get('todos').map((i) => i.set('priority', 'high')))
        return newState
      default:
          return state;
    }
}

function todosReducer(action,state) {return state}

export const migration = createMigration(manifest, "app", {'log': true});
const enhancer = compose(applyMiddleware(logger), migration, autoRehydrate({log:true}));

export const store = createStore(todosReducer, initialState, enhancer);
