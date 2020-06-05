import React, {Component} from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundary from '../components/ErrorBoundary';
import './App.css';

class App extends Component {
	constructor(){
		super();
		this.state = {
			robots: [],
			searchfield: ''
		};
	}

	componentDidMount() {
		fetch('https://jsonplaceholder.typicode.com/users')
		.then( response => response.json())
		.then( users => this.setState({robots: users}) );
	}

	onSearch = (event) => {
		this.setState({searchfield: event.target.value})
	}

	render () {
		const filteredRobots = this.state.robots.filter(robot => robot.name.toLowerCase().includes(this.state.searchfield.toLowerCase()));

		if(this.state.robots.length < 1){
			return <h1>Loading ...</h1>;
		}
		else{
			return (
			<div className='tc'>
				<h1 className="f1">Robo Friends</h1>
				<SearchBox onSearch={this.onSearch}/>
				<hr />
				<Scroll>
				<ErrorBoundary>
				<CardList robots={filteredRobots}/>
				</ErrorBoundary>
				</Scroll>
			</div>
		);
		}
	}
}

export default App;