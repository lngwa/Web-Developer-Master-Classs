export const changeSearchField = (text = "") => ({
	type: "CHANGE_SEARCHFIELD",
	payload: text 
})

export const getRobots = () => (dispatch) => {
	dispatch({type: "REQUEST_ROBOTS_PENDING"});
	fetch('https://jsonplaceholder.typicode.com/users')
		.then( response => response.json())
		.then(data => dispatch({type: 'REQUEST_ROBOTS_SUCCESS', payload: data}))
		.catch(error => dispatch({type: 'REQUEST_ROBOTS_FAILED', payload: error}));
}