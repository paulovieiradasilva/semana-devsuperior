import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles.css';
import { RecordsResponse } from './types';
import { formatDate } from './helpers';
import { Link } from 'react-router-dom';
import Pagination from './pagination';


const BASE_URL = 'http://localhost:8080';

const Record = () => {

	const [recordsResponse, setRecordsResponse] = useState<RecordsResponse>();
	const [activePage, setActivePage] = useState(0);

	useEffect(() => {
		axios.get(`${BASE_URL}/records?linesPerPage=12&page=${activePage}`)
			.then((response) => {
				setRecordsResponse(response.data);
			});

	}, [activePage]);

	return (
		<div className="page-container">
			<div className="filters-container records-actions">
				<Link to="/charts">
					<button className="action-filters">
						VER GRÁFICO
					</button>
				</Link>
			</div>
			<table className="records-table" cellPadding="0" cellSpacing="0">
				<thead>
					<tr>
						<th>Instante</th>
						<th>Nome</th>
						<th>Idade</th>
						<th>Plataforma</th>
						<th>Gênero</th>
						<th>Titulo do Game</th>
					</tr>
				</thead>
				<tbody>
					{recordsResponse?.content.map(record => (
						<tr key={record.id}>
							<td>{formatDate(record.moment)}</td>
							<td>{record.name}</td>
							<td>{record.age}</td>
							<td className="text-secondary">{record.gamePlatform} Playstation</td>
							<td>{record.gameGenre}</td>
							<td className="text-primary">{record.gameTitle}</td>
						</tr>
					))}
				</tbody>
			</table>
			<Pagination
				activePage={activePage}
				totalPages={recordsResponse?.totalPages}
				goToPage={(index: number) => setActivePage(index)} />
		</div>
	);
};

export default Record;
