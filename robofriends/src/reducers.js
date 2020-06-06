const initialState = {
	searchField: ""
}
const searchRobot = (state=initialState, action={}) => {
	switch(action.type){
		case "CHANGE_SEARCHFIELD":
				return {...state, searchField: action.payload};
		default:
				return state;
	}
}

export default searchRobot;