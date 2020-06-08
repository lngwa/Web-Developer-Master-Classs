import React, {Component} from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundary from '../components/ErrorBoundary';
import './App.css';
import {connect} from 'react-redux';
import {changeSearchField, getRobots} from '../actions';

const mapStateToProps = state => {
		return { 
			searchField: state.searchRobot.searchField,
			isPending: state.getRobots.isPending,
			robots: state.getRobots.robots,
			error: state.getRobots.error
		};
	}

const mapDispatchToProps = (dispatch) => {
	return {
		onSearchChange: (event) => dispatch(changeSearchField(event.target.value)),
		onRobotRequest: () => dispatch(getRobots())
	}
}

class App extends Component {

	componentDidMount() {
		this.props.onRobotRequest();
	}
	
	render () {
		const {searchField, onSearchChange, robots, isPending} = this.props;
		const filteredRobots = robots.filter(
			robot => robot.name.toLowerCase()
			.includes(searchField.toLowerCase()));

		if(isPending){
			return <h1>Loading ...</h1>;
		}
		else{
			return (
			<div className='tc'>
				<h1 className="f1">Robo Friends</h1>
				<SearchBox onSearch={onSearchChange}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(App);