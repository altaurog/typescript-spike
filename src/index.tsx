import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import * as types from './types';
import { userData } from './reducers';
import { dataLoader } from './sagas';

import Navigation from './components/Navigation';
import ErrorBar from './components/Error';
import DataGrid from './components/DataGrid';

import './index.css';

const initialState = {
    data: [],
    paging: { perPage: 3, requestedPage: 1 }
} as types.StoreState;
const sagaMiddleware = createSagaMiddleware();
const store = createStore<types.StoreState>(
    userData,
    initialState,
    applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(dataLoader);

ReactDOM.render(
    <Provider store={store}>
        <div className="app">
            <Navigation />
            <ErrorBar />
            <DataGrid />
        </div>
    </Provider>,
    document.getElementById('root') as HTMLElement
);
