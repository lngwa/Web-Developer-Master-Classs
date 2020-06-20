const fs = require('fs');

//Q1
fs.readFile('./santa.txt', (err, data) => {
	if(err){
		console.log("erroooooor");
	}
	else{
	console.time('elasped')
		const plan = data.toString().split('');
		const answer = plan.reduce((acc, vl) => {
			if(vl === '('){
				return acc += 1;
			}
			else if (vl === ')'){
				return acc -= 1;
			}
		}, 0);
		console.timeEnd('elasped')
		console.log(answer);
		
	}
});

//Q2
fs.readFile('./santa.txt', (err, data) => {
	if(err){
		console.log("erroooooor");
	}
	else{
	console.time('elasped')
		const plan = data.toString().split('');
		const answer = plan.reduce((acc, vl) => {
			if(vl === '('){
				return acc += 1;
			}
			else if (vl === ')'){
				return acc -= 1;
			}
		}, 0);
		console.timeEnd('elasped')
		console.log(answer);
		
	}
});