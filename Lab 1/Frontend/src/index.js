import React from 'react';
import ReactDOM from 'react-dom';
import {App} from './App';
import {BrowserRouter} from 'react-router-dom';
import { createStore } from 'redux'
import {Provider} from 'react-redux';
import reducer from "./reducer/reducer"
import {composeWithDevTools} from 'redux-devtools-extension';

const store= createStore(reducer,composeWithDevTools());
ReactDOM.render(<Provider store={store}><BrowserRouter><App /></BrowserRouter>
</Provider>, document.getElementById('root'));