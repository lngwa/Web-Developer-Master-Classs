import React from 'react';

const Navigation = ({onSignOut}) => {
	return (
		<nav style={{display: 'flex', justifyContent: 'flex-end'}}>
			<h3 className='f3 link dim black underline pa3 pointer' onClick={onSignOut}>Sign Out</h3>
		</nav>
	)
}

export default Navigation;