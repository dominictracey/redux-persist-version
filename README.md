## Redux Persist Version

Migrate redux state between versions with redux-persist-immutable.

This is forked from https://github.com/xiongxiong/redux-persist-version to add in support for redux-persist-immutable

#### Install & Test

```
npm install
npm test
```

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
      { version: "0.0.1" },
      { version: "0.0.2" },
      { version: "0.1.0" },
    ]
};

const migration = createMigration(manifest, "app");
const enhancer = compose(applyMiddleware(logger), migration, autoRehydrate({log: true}));

export const store = createStore(todosReducer, undefined, enhancer);

function updateState(state, version) {
    const newState = Object.assign({}, state)

    switch (version) {
      case '0.0.1':
        newState.todos = state.todos.map((i) => Object.assign({}, i, {complete: false}))
        return newState
      case '0.0.2':
        newState.todos = state.todos.map((i) => Object.assign({}, i, {lastUpdate: moment()}))
        return newState
      case '0.1.0':
        newState.todos = state.todos.map((i) => Object.assign({}, i, {priority: 'high'}))
        return newState
      default:
          return state;
    }
}

```
#### Notes
Currently works only with redux-persist@4.x
