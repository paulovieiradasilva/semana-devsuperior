import React, { useState } from 'react';
import Filters from '../../components/Filters';
import './styles.css';
import { barOptions, pieOptions } from './chart-options';
import { buildBarSeries, getPlatformChartData, getGenderChartData } from './helpers';
import Chart from 'react-apexcharts';
import axios from 'axios';
import { BASE_URL } from '../../api';

type PieChartData = {
	labels: string[];
	series: number[];
};

type BarChartData = {
	x: string;
	y: number;
};

const initialPieChartData = {
	labels: [],
	series: []
};

const Charts = () => {

	const [barChartData, setBarChartData] = useState<BarChartData[]>([]);
	const [platformChartData, setPlatformChartData] = useState<PieChartData>(initialPieChartData);
	const [genderChartData, setGenderChartData] = useState<PieChartData>(initialPieChartData);

	useState(() => {
		async function getData() {
			const recordsResponse = await axios.get(`${BASE_URL}/records`);
			const gamesResponse = await axios.get(`${BASE_URL}/games`);

			const barData = buildBarSeries(gamesResponse.data, recordsResponse.data.content);
			setBarChartData(barData);

			const platformChartData = getPlatformChartData(recordsResponse.data.content);
			setPlatformChartData(platformChartData);

			const genderChartData = getGenderChartData(recordsResponse.data.content);
			setGenderChartData(genderChartData);

		}
		getData();
	});

	return (
		<div className="page-container">
			<Filters link="/records" linkText="VER TABELA" />

			<div className="chart-container">
				<div className="top-related">
					<h1 className="top-related-title">
						Jogos mais Votados
					</h1>
					<div className="games-container">
						<Chart
							options={barOptions}
							type="bar"
							width="600"
							height="600"
							series={[{ data: barChartData }]}
						/>
					</div>
				</div>
				<div className="charts">
					<div className="platform-chart">
						<h2 className="charts-title">Plataformas</h2>
						<Chart
							options={{ ...pieOptions, labels: platformChartData?.labels }}
							type="donut"
							width="350"
							series={platformChartData?.series} />
					</div>
					<div className="gender-chart">
						<h2 className="charts-title">Gêneros</h2>
						<Chart
							options={{ ...pieOptions, labels: genderChartData?.labels }}
							type="donut"
							width="350"
							series={genderChartData?.series} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Charts;
