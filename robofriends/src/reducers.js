const initialState = {
	searchField: ""
}
export const searchRobot = (state=initialState, action={}) => {
	switch(action.type){
		case "CHANGE_SEARCHFIELD":
				return {...state, searchField: action.payload};
		default:
				return state;
	}
}

const initialRobots = {
	isPending: false,
	robots: [],
	error: ""
}

export const getRobots = (state=initialRobots, action={}) => {
	switch(action.type){
		case "REQUEST_ROBOTS_PENDING":
			return Object.assign({}, state, {isPending: true});
		case "REQUEST_ROBOTS_SUCCESS":
			return Object.assign({}, state, {isPending: false, robots: action.payload});
		case "REQUEST_ROBOTS_FAILED":
			return Object.assign({}, state, {isPending: false, error: action.payload});
		default:
			return state;
	}
}