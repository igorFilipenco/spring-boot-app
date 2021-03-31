import {
	REQUEST_USER_REGISTER,
	RECEIVE_USER_REGISTER,
	RECEIVE_USER_AUTH,
	LOADING_CURRENT_USER
}  from '../actions/auth';


const initialState = {
	userData : {},
	currentUserLoaded: false,
};

export const auth = (state = initialState, action) => {
	switch (action.type) {
		case REQUEST_USER_REGISTER:
			return {
				...state,
				currentUserLoaded: action.payload
			};
		case RECEIVE_USER_REGISTER:
			return {
				...state,
				currentUserLoaded: true,
			};
		case RECEIVE_USER_AUTH:
			return {
				...state,
				userData: action.payload,
				currentUserLoaded: true,
			};
		default:
			return state
	}
};