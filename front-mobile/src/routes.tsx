import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './pages/Home';
import CreatedRecords from './pages/CreatedRecords';

const Stack = createStackNavigator();

const Routes = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator headerMode="none" screenOptions={{ cardStyle: { backgroundColor: '#0B1F34' } }}>
				<Stack.Screen name="Home" component={Home} />
				<Stack.Screen name="CreatedRecords" component={CreatedRecords} />
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default Routes;