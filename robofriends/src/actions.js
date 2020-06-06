const changeSearchField = (text = "") => ({
	type: "CHANGE_SEARCHFIELD",
	payload: text 
})

export default changeSearchField;