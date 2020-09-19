export type RecordsResponse = {
	content: RecordItem[];
	totalPages: number;
};

export type RecordItem = {
	id: number;
	moment: string;
	name: string;
	age: number;
	gameTitle: string;
	gamePlatform: Plataforma;
	gameGenre: string;
};

export type Plataforma = 'XBOX' | 'PC' | 'PLAYTATION';