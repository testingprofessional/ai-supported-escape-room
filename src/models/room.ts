import type { Puzzle } from './puzzle.js';

export interface EscapeRoom {
    naam: string;
    beschrijving: string;
    voorwerpen: string[];
    puzzels: Puzzle[];
}