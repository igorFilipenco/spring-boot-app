import {createContext} from "react";

const AppContext = createContext({
	user: {name: 'Ivan'}
});

export default AppContext;