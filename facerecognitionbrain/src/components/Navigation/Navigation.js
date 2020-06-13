import React from 'react';

const Navigation = ({onRouteChange, isSignedIn}) => {
		if(isSignedIn){
			return (
				<nav style={{display: 'flex', justifyContent: 'flex-end'}}>
					<p className='f3 link dim black underline pa3 pointer' onClick={() => onRouteChange('signin')}>Sign Out</p>
				</nav>
			);
		}
		else {
			return (
				<nav style={{display: 'flex', justifyContent: 'flex-end'}}>
					<h3 className='f3 link dim black underline pa3 pointer' onClick={() => onRouteChange('register')}>Register</h3>
					<h3 className='f3 link dim black underline pa3 pointer' onClick={() => onRouteChange('signin')}>Sign In</h3>
				</nav>
			);
		}
}

export default Navigation;