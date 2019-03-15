import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './views/styles/index.scss';
import { Provider } from 'react-redux';
import App from './views/App';
import { store } from './views/store/reducer';

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
