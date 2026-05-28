import type { SongRecord } from '../types/song'

export const seedSongs: SongRecord[] = [
	{ title: 'Blinding Lights', plays: 1500, genre: 'pop' },
	{ title: 'Levitating', plays: 1320, genre: 'pop' },
	{ title: 'Bohemian Rhapsody', plays: 1450, genre: 'rock' },
	{ title: 'Smells Like Teen Spirit', plays: 1280, genre: 'rock' },
	{ title: 'Take Five', plays: 980, genre: 'jazz' },
	{ title: 'So What', plays: 930, genre: 'jazz' },
	{ title: 'SICKO MODE', plays: 1410, genre: 'trap' },
	{ title: 'Goosebumps', plays: 1200, genre: 'trap' },
	{ title: 'PRC', plays: 1180, genre: 'corridos tumbados' },
	{ title: 'AMG', plays: 1250, genre: 'corridos tumbados' },
	{ title: 'Vivir Mi Vida', plays: 1020, genre: 'salsa' },
	{ title: 'La Rebelion', plays: 940, genre: 'salsa' },
	{ title: 'Propuesta Indecente', plays: 1100, genre: 'bachata' },
	{ title: 'Bachata Rosa', plays: 970, genre: 'bachata' },
	{ title: 'Bangarang', plays: 1360, genre: 'electronica' },
	{ title: 'Tremor', plays: 1240, genre: 'electronica' },
]

export const seedRelations: Array<[string, string]> = []