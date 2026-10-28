import type { EscapeRoom } from '../models/room.js';
import { vraagAanAI } from './ollama-client.js';

export async function beschrijfKamer(escapeRoom: EscapeRoom): Promise<string> {
    const prompt = `
    Je bent de verteller van een tekstuele escape room.

    Naam van de kamer: ${escapeRoom.naam}
    Beschrijving: ${escapeRoom.beschrijving}
    Voorwerpen: ${escapeRoom.voorwerpen.join(', ')}

    Beschrijf de kamer sfeervol in één korte zin.
    Verzin geen nieuwe voorwerpen of spelregels.
    `;

    return await vraagAanAI(prompt);
}