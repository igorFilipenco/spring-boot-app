import React, {Component} from "react";
import {HashRouter as Router, Route, Switch} from "react-router-dom";
import {Provider} from "react-redux";
import {store} from "./store";

import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import RegistryPage from "./pages/RegistryPage";
import NotFound from "./pages/NotFound";


export default class App extends Component {
	render() {
		return(
			<Provider store={store}>
				<Router history={history}>
					<Switch>
						<Route exact path="/" component={MainPage}/>
						<Route exact path="/login" component={LoginPage}/>
						<Route exact path="/registration" component={RegistryPage}/>
						<Route path="*" component={NotFound}/>
					</Switch>
				</Router>
			</Provider>
		);
	}
}