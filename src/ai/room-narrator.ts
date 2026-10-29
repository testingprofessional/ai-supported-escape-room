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
    Noem in de beschrijving uitsluitend voorwerpen die in de opgegeven kamerdata staan en verzin geen andere objecten.
    Geef in geen geval informatie over de oplossingen van puzzels.
    Doe geen aannames over de inventaris of handelingen van de speler.
    `;

    const resultaat = await vraagAanAI(prompt);

    if(resultaat.trim().length > 0) {
        return resultaat;
    } else {
        throw new Error('De AI heeft geen bruikbare beschrijving gegenereerd.');
    }
}