const express = require('express');

const app = express();

//MiddleWare

app.use((req, res, next) => {
	console.log("authenticating ...");
	next();
});


app.use(express.urlencoded({extended: false}));
app.use(express.json());

//Landing page
app.use(express.static(__dirname + '/public'));

//Routes
app.get('/:id', (req, res) => {
	console.log("params", req.params);
	console.log("querystring", req.query);
	console.log("body", req.body);
	res.send("hi")
});

const user = {
	'user': 'Lewis',
	'age': 28
}

app.post('/', (req, res) => {
	const user = req.body
	console.log(user)
	res.send(user)
});


//Server Ports
app.listen(2020);
app.listen(2021);