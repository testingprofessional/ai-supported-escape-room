import type { Puzzle } from '../models/puzzle.js';
import { vraagAanAI } from './ollama-client.js';

export async function genereerHint(puzzle: Puzzle): Promise<string> {
    if(puzzle.hints.length === 0) {
        throw new Error("Er zijn geen hints beschikbaar voor deze puzzel.");
    }

    const voorafBepaaldeHint = puzzle.hints[0]

    const prompt = `
    Je bent de begeleider van een tekstuele escape room.

    Naam van de puzzel: ${puzzle.naam}
    Beschrijving: ${puzzle.beschrijving}
    Hint: ${voorafBepaaldeHint}

    Beschrijf de hint in één korte zin.
    Formuleer de aangeleverde hint sfeervol en natuurlijk.
    De betekenis van de hint mag niet veranderen.
    Voeg geen nieuwe aanwijzingen, oplossingsmethodes of spelregels toe.
    Je mag de oplossing absoluut niet onthullen.
`;

    const hint = puzzle.hints[0]!;

    if(hint.trim().length > 0) {
        return hint;
    } else {
        throw new Error('De AI heeft geen bruikbare hint gegenereerd.');
    }
}