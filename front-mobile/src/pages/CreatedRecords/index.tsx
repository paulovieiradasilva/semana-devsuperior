import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Header from '../../components/Header';

const CreatedRecords = () => {
	return (
		<>
			<Header />
			<Text style={styles.text}>Created Records</Text>
		</>
	);
};

export default CreatedRecords;

const styles = StyleSheet.create({
	text: {
		color: '#FFF'
	}
})