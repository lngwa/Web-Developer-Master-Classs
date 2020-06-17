const express = require('express');
const bcrypt = require("bcrypt-nodejs");

const app = express();

app.use(express.json());

const db = {
	users: [
		{
			id: 1,
			name: 'che',
			email: 'che@gmail.com',
			password: 'abc',
			entries: 0,
			joined: new Date()
		},
		{
			id: 2,
			name: 'ngwa',
			email: 'ngwa@gmail.com',
			password: 'def',
			entries: 0,
			joined: new Date()
		}
	]
}

//Endpoints

/*
	/ - GET landing page
	/signin - POST return success/fail
	/register - POST return new user
	/profile/:id - GET - return user
	/image - PUT - return user 

*/
app.get('/', (req, res) => {
	res.send(db.users)
});

app.post('/signin', (req, res) => {
	const {email, password} = req.body;
	const signedIn = db.users.some(user => (user.email === email && user.password === password));
	signedIn ? res.json("success") : res.status(400, 'great').json("fail");
})

app.post('/register', (req, res) => {	
	const {name, email, password} = req.body;
	const user = {
			id: db.users[db.users.length - 1].id + 1,
			name: name,
			email: email,
			password: password,
			entries: 0,
			joined: new Date()
	}
	db.users.push(user);
	res.json(user);
});

app.get('/profile/:id', (req, res) => {
	const {id} = req.params;
	let found = false;
	db.users.forEach(user => {
		if(user.id === Number(id)){
			found = true;
			return res.json(user);
		}
	})
	if(!found){
		res.status(400).json("Not found!");
	}
})

app.put('/image', (req, res) => {
	const {id} = req.body;
	let found = false;
	db.users.forEach(user => {
		if(user.id === Number(id)){
			found = true;
			user.entries++;
			return res.json(user.entries);
		}
	})
	if(!found){
		res.status(400).json("Not found!");
	}
})


//Server ports
app.listen(3001, () => {
	console.log("Server is running on port 3001");	
});