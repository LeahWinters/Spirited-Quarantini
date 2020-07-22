import React, { useState } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';

export interface DashboardProps extends RouteComponentProps<any> {

}

const Dashboard: React.SFC<DashboardProps> = () => {
	//api call for random cocktail

	return (
		<div>RANDOM COCKTAIL IMG HERE</div>
	)
}

export default Dashboard;