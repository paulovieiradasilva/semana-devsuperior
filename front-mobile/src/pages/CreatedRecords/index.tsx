import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TextInput, Alert } from 'react-native';
import { FontAwesome5 as Icon } from '@expo/vector-icons';
import RNPickerSelect from 'react-native-picker-select';
import { RectButton } from 'react-native-gesture-handler';
import Header from '../../components/Header';
import PlatformCard from './PlatformCard';
import { Game, GamePlatform } from './types';
import axios from 'axios';
import { BASE_URL } from '../../api';


const placeholder = {
	label: 'Selecione o game',
	value: null
};

const mapSelecteValue = (games: Game[]) => {
	return games.map((game) => ({
		...game,
		label: game.title,
		value: game.id
	}));
};

const CreatedRecords = () => {

	const [name, setName] = useState('');
	const [age, setAge] = useState('');
	const [platform, setPlatform] = useState<GamePlatform>();
	const [selectedGame, setSelectedGame] = useState('');
	const [allGames, setAllGames] = useState<Game[]>([]);
	const [filteredGames, setFilteredGames] = useState<Game[]>([]);

	/** */
	const handlerChangePlatform = (selectedPlatform: GamePlatform) => {
		setPlatform(selectedPlatform);
		const gamesByPlatform = allGames.filter(
			game => game.platform === selectedPlatform
		);
		setFilteredGames(gamesByPlatform);
	};

	/** */
	const handlerSubmit = () => {
		const payload = { name, age, gameId: selectedGame };

		/** */
		axios.post(`${BASE_URL}/records`, payload)
			.then(() => {
				Alert.alert('Gravado com sucesso!');
				/** */
				setName('');
				setAge('');
				setSelectedGame('');
				setPlatform(undefined);
			})
			.catch(() => Alert.alert('Erro ao salvar as informações.'));
	};

	useEffect(() => {
		axios.get(`${BASE_URL}/games`)
			.then((response) => {
				const selecteValue = mapSelecteValue(response.data);
				setAllGames(selecteValue);
			})
			.catch(() => Alert.alert('Erro ao listar os jogos.'));
	}, []);

	return (
		<>
			<Header />
			<View style={styles.container}>
				<TextInput
					style={styles.inputText}
					placeholder="Nome"
					placeholderTextColor="#9E9E9E"
					onChangeText={text => setName(text)}
					value={name}
				/>

				<TextInput
					keyboardType="numeric"
					maxLength={3}
					style={styles.inputText}
					placeholder="Idade"
					placeholderTextColor="#9E9E9E"
					onChangeText={text => setAge(text)}
					value={age}
				/>
				<View style={styles.platformContainer}>
					<PlatformCard platform="PC" icon="laptop" onChange={handlerChangePlatform} activePlatform={platform} />
					<PlatformCard platform="XBOX" icon="xbox" onChange={handlerChangePlatform} activePlatform={platform} />
					<PlatformCard platform="PLAYSTATION" icon="playstation" onChange={handlerChangePlatform} activePlatform={platform} />
				</View>
				<RNPickerSelect
					onValueChange={(value) => setSelectedGame(value)}
					placeholder={placeholder}
					value={selectedGame}
					items={filteredGames}
					style={pickerSelectStyles}
					Icon={() => {
						return <Icon name="chevron-down" color="#9E9E9E" size={20} />;
					}}
				/>
				<RectButton style={styles.button} onPress={handlerSubmit}>
					<Text style={styles.buttonText}>SALVAR</Text>
				</RectButton>
			</View>
		</>
	);

};

export default CreatedRecords;

const pickerSelectStyles = StyleSheet.create({
	inputIOS: {
		fontSize: 16,
		paddingVertical: 12,
		paddingHorizontal: 20,
		backgroundColor: '#FFF',
		borderRadius: 0,
		color: '#ED7947',
		paddingRight: 30,
		fontFamily: "Play_700Bold",
		height: 50
	},
	inputAndroid: {
		fontSize: 16,
		paddingVertical: 12,
		paddingHorizontal: 20,
		backgroundColor: '#FFF',
		borderRadius: 10,
		color: '#ED7947',
		paddingRight: 30,
		fontFamily: "Play_700Bold",
		height: 50,
		marginBottom: 20
	},
	placeholder: {
		color: '#9E9E9E',
		fontSize: 16,
		fontFamily: "Play_700Bold",
	},
	iconContainer: {
		top: 13,
		right: 12,
	}
});

const styles = StyleSheet.create({
	container: {
		marginTop: '5%',
		paddingRight: '5%',
		paddingLeft: '5%',
		paddingBottom: 50
	},
	inputText: {
		height: 50,
		backgroundColor: '#FFF',
		borderRadius: 10,
		color: '#ED7947',
		fontFamily: "Play_700Bold",
		fontSize: 16,
		paddingLeft: 20,
		marginBottom: 21
	},
	platformContainer: {
		marginBottom: 20,
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	footer: {
		marginTop: '15%',
		alignItems: 'center',
	},
	button: {
		backgroundColor: '#00D4FF',
		flexDirection: 'row',
		borderRadius: 10,
		height: 60,
		width: '100%',
		alignItems: 'center',
		justifyContent: 'center'
	},
	buttonText: {
		fontFamily: "Play_700Bold",
		fontWeight: 'bold',
		fontSize: 18,
		color: '#0B1F34',
	}
});