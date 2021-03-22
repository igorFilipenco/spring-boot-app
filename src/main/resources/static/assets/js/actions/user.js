import store from "../index";
import * as  UrlUtils from "../utils/UrlUtils";

export const REQUEST_USER_REGISTER = "REQUEST_USER_REGISTER";
export const RECEIVE_USER_REGISTER = "RECEIVE_USER_REGISTER";
export const RECEIVE_USER_AUTH    = "RECEIVE_USER_AUTH"
export const LOADING_CURRENT_USER = 'LOADING_CURRENT_USER'


export const registerNewUser = (userData) => (dispatch) => {
	let requestParams = {};
	let path = "";

	if (userData.userName && userData.password) {
		requestParams['userName'] = userData.userName;
		requestParams['password'] = userData.password;
	}

	let url = UrlUtils.buildUrl("http://localhost:8080/api/v1/register", path, requestParams, false,'POST');
console.log('URL', url)
	dispatch({
		type: REQUEST_USER_REGISTER,
		payload: true,
	});

	return fetch(url, {
		credentials: 'same-origin',
		method: 'POST',
	})
		.then(response => response.json())
		.then(json => {
			dispatch({
				type: REQUEST_USER_REGISTER,
				payload: false,
			});

			return json;
		})
		.catch(function (error) {
			console.log('Request failure: ', error);
		});
}

export const authUser = (userData) => (dispatch) => {
	let requestParams = {};
	let path = "";

	if (userData.userName && userData.password) {
		requestParams['userName'] = userData.userName;
		requestParams['password'] = userData.password;
	}

	let url = UrlUtils.buildUrl("http://localhost:8080/api/v1/register", path, {});

	dispatch({
		type: REQUEST_USER_REGISTER,
		payload: true,
	});

	return fetch(url, {
		credentials: 'same-origin',
		method: 'POST',
	})
		.then(response => response.json())
		.then(json => {
			dispatch({
				type: REQUEST_USER_REGISTER,
				payload: false,
			});

			return dispatch({
				type: RECEIVE_USER_AUTH,
				currentUser: json,
			})
		})
		.catch(function (error) {
			console.log('Request failure: ', error);
		});
}