import {HttpService} from "../utils/HttpService";

import {
	BASIC_PATH,
	BASIC_URL,
	USERS_URL
} from "../constants/routes";

export const REQUEST_USERS = "REQUEST_USERS";
export const RECEIVE_USERS = "RECEIVE_USERS";
export const REQUEST_USER_EDIT = "REQUEST_USER_EDIT";
export const RECEIVE_USER_EDIT = "RECEIVE_USER_EDIT";
export const REQUEST_USER_DELETE = "REQUEST_USER_DELETE";
export const RECEIVE_USER_DELETE = "RECEIVE_USER_DELETE";


export const getUsers = () => (dispatch) => {
	const url = BASIC_URL + BASIC_PATH + USERS_URL;

	dispatch({
		type: REQUEST_USERS,
		payload: true,
	});

	return HttpService.get(url, {})
		.then(response => {
			dispatch({
				type: REQUEST_USERS,
				payload: false,
			});

			dispatch({
				type: RECEIVE_USERS,
				payload: response,
			});
		})
}

export const editUser = (userData) => (dispatch) => {

}

export const deleteUser = (userData) => (dispatch) => {

}
