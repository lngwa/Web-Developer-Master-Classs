import React, {Component, Fragment} from 'react';

class ErrorBoundary extends Component {
	constructor(props){
		super(props);
		this.state = {
			isfailure: false
		}
	}

	componentDidCatch(error, info){
		this.setState({isfailure: true})
	}

	render(){
		if(this.state.isfailure){
			return <h1>Oooops something went wrong!</h1>
		}
		return <Fragment>{this.props.children}</Fragment>
	}
}

export default ErrorBoundary;