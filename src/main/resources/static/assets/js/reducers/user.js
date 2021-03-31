import {
	REQUEST_USERS,
	RECEIVE_USERS,
	REQUEST_USER_EDIT,
	RECEIVE_USER_EDIT,
	REQUEST_USER_DELETE,
	RECEIVE_USER_DELETE
}  from '../actions/user';


const initialState = {
	users : [],
	usersLoaded: false,
};

export const user = (state = initialState, action) => {
	switch (action.type) {
		case REQUEST_USERS:
			return {
				...state,
				usersLoaded: action.payload
			};
		case RECEIVE_USERS:
			return {
				...state,
				users: action.payload,
			};
		case REQUEST_USER_EDIT:
			return {
				...state,
				usersLoaded: action.payload
			};
		case RECEIVE_USER_EDIT:
			return {
				...state,
				users: action.payload,
			};
		case REQUEST_USER_DELETE:
			return {
				...state,
				usersLoaded: action.payload
			};
		case RECEIVE_USER_DELETE:
			return {
				...state,
				users: action.payload,
			};
		default:
			return state
	}
};