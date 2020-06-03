const sortArray = (arr) => {
	if(arr === null || arr.length < 1){
		return [];
	}
	return arr.sort()
		.reduce((acc, e) => {
			const add = (ac) => {
				if(ac.length < 1){
					ac.push([e]);
				}
				else if(ac[ac.length - 1][0] === e){
					ac[ac.length - 1].push(e);
				}
				else {
					ac.push([e]);
				}
				return ac;
			}
			if(typeof(e) === "number"){
				acc[0] = add(acc[0]);
			}
			else{
				acc[1] = add(acc[1]);
			}			
			return acc;
		}, [[],[]])
		.filter(ar => ar.length > 0)
		.map(ar => {
			return ar.map(e => {
						if(e.length > 1){
							return e;
						}
						else {
							return e[0];
						}
					})
		});
}

const sumTwoNumbers = (arr, sum) => {
	for(let i = 0; i < arr.length - 1; i++){
		for(let j = i+1; j < arr.length; j++){
			if(arr[i] + arr[j] === sum){
				return [arr[i], arr[j]];
			}
		}
	}
	return [];
}