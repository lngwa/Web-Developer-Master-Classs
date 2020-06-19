const express = require('express');
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require('knex');

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'root',
    database : 'smart-brain'
  }
});



const app = express();

app.use(express.json());

app.use(cors())

// const db = {
// 	users: [
// 		{
// 			id: 1,
// 			name: 'che',
// 			email: 'che@gmail.com',
// 			password: 'abc',
// 			entries: 0,
// 			joined: new Date()
// 		},
// 		{
// 			id: 2,
// 			name: 'ngwa',
// 			email: 'ngwa@gmail.com',
// 			password: 'def',
// 			entries: 0,
// 			joined: new Date()
// 		}
// 	]
// }

//Endpoints

/*
	/ - GET landing page
	/signin - POST return success/fail
	/register - POST return new user
	/profile/:id - GET - return user
	/image - PUT - return user 

*/
app.get('/', (req, res) => {
	db.select('*').from('users')
	.then(data => res.send(data))
	.catch(err => res.status(400).json("Error getting users"));
});

app.post('/signin', (req, res) => {
	const {email, password} = req.body;
	db('login').select(['email', 'hash'])
	.where({email})
	.then(credential => {
		if(credential.length > 0 && bcrypt.compareSync(password, credential[0].hash)){
			return db('users').select('*').where({email})
					.then(user => res.json(user[0]))
					.catch(err => res.status(400).json("unable to get user"))
		}
		else{
			throw new Error("wrong credentials")
		}
	})
	.catch(err => res.status(400).json("Wrong credentials"));
	
	
})

app.post('/register', (req, res) => {	
	const {name, email, password} = req.body;
	const hash = bcrypt.hashSync(password);
	db.transaction( trx => {
		trx.insert({email: email, hash: hash})
			.into('login')
			.returning('email')
			.then(loginEmail => {
				return trx('users')
					.returning('*')
					.insert({
						name: name,
						email: loginEmail[0],
						joined: new Date()
					})
					.then(user => res.json(user[0]))
			})
			.then(trx.commit)
			.catch(trx.rollback);
	})	
	.catch(err => res.status(400).json("Unable to register"));	
});

app.get('/profile/:id', (req, res) => {
	const {id} = req.params;
	let found = false;
	db.select('users')
	.where({'id': id})
	.then(user => {
		if(user.length > 0){
			res.json(user[0]);
		}
		else{
			res.status(404).json("User not found");
		}
	})
	.catch(err => res.status(400).json("Error getting user"));
})

app.put('/image', (req, res) => {
	const {id} = req.body;
	let found = false;
	db('users')
	.where({id})
	.increment('entries')
	.returning('entries')
	.then(entries => {
		if(entries.length > 0){
			res.json(Number(entries[0]));
		}
		else{
			res.status(404).json("User not found");
		}
	})
	.catch(err => res.status(400).json("Error getting user"));
})


//Server ports
app.listen(3001, () => {
	console.log("Server is running on port 3001");	
});