import React from 'react';

const Scroll = (props) => {
	return (
		<div style={{overflowY: 'scroll', height: 800}}>
			{props.children}
		</div>
		);
}

export default Scroll;