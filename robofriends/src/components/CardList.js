import React from 'react';
import Card from './Card';

const CardList = ({robots}) => {
	return <>{robots.map((user,i) => <Card key={i} id={user.id} name={user.name} email={user.email} />)}</>
}

export default CardList;