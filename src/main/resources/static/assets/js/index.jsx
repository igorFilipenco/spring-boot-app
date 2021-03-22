import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter as Router, Route, Switch} from 'react-router-dom';
import {Provider} from "react-redux";
import {
	createStore,
	applyMiddleware,
	compose
}                               from 'redux';
import {createLogger}           from 'redux-logger';
import thunk                    from 'redux-thunk';
import reducer                  from './reducers/reducer';


import NotFound from "./pages/NotFound"
import MainPage from "./pages/MainPage"
import RegistryPage from "./pages/RegistryPage";
import LoginPage from "./pages/LoginPage";

import 'babel-polyfill';
import 'semantic-ui-css/semantic.min.css'


const middleware = [thunk, createLogger()];
let container = document.getElementById('react');

const store = createStore(
	reducer,
	compose(applyMiddleware(...middleware))
);

ReactDOM.render(
	<Provider store={store}>
		<Router history={history}>
			<Switch>
				<Route exact path="/" component={MainPage}/>
				<Route exact path="/login" component={LoginPage}/>
				<Route exact path="/registration" component={RegistryPage}/>
				<Route path="*" component={NotFound}/>
			</Switch>
		</Router>
	</Provider>,
	container
);

export default store;