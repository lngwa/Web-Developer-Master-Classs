import React from 'react';

const SearchBox = ({onSearch}) => {
	return (
		<div className='pa2'>
			<input 
				type="Search" 
				placeholder="Search robots" 
				className="pa3 ba b--green bg-lightest-blue" 
				onChange={onSearch}
			/>
		</div>
	);
}

export default SearchBox;