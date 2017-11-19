## Redux Persist Version

Migrate redux state between versions with redux-persist-immutable.

This is forked from https://github.com/xiongxiong/redux-persist-version to add in support for redux-persist-immutable

#### Usage
```js
import {compose, applyMiddleware, createStore} from 'redux';
import {autoRehydrate} from 'redux-persist-immutable';
import uuid from 'uuid/v4';
import {reducer as todosReducer} from './todosRedux';
import Todo from './todo';
import createMigration from './redux-persist-version-immutable';
import logger from 'redux-logger';
import {fromJS} from 'immutable'

export const initialState = fromJS({
    app: {
        version: "0.1.0"
    },
    todos: []
});

const manifest = {
  migrate: (state, version) => updateState(state, version),
  migrations: [
    {
      version: '0.0.1',
    },
    {
      version: '0.0.2',
    },
    {
      version: '0.1.0',
    },
  ],
}

const migration = createMigration(manifest, "app");
const enhancer = compose(applyMiddleware(logger), migration, autoRehydrate({log: true}));

export const store = createStore(todosReducer, undefined, enhancer);

function updateState(state, version) {
    switch (version) {
        default:
            return state;
    }
}

function updateTodo(todo, version) {
    switch (version) {
        default:
            return todo;
    }
}
```
