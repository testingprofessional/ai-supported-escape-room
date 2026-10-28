import type { EscapeRoom } from './models/room.js';
import type { GameState } from './models/game-state.js';
import { beschrijfKamer } from './ai/room-narrator.js';
import { verwerkActie } from './game/game-engine.js';
import type { PlayerAction } from './models/action.js';

const escapeRoom: EscapeRoom = {
    naam: 'De Vergeten Werkkamer',
    beschrijving: 'Je zit opgesloten in een oude werkkamer. Vind een manier om te ontsnappen.',
    voorwerpen: ['Sleutel', 'Zaklamp'],
    puzzels: [{naam: 'Cijfercode',
               beschrijving: 'Een paneel vraagt om een viercijferige code.',
               oplossing: '2580',
               opgelost: false},
              {naam: 'Verborgen schakelaar',
               beschrijving: 'Er zit ergens in de kamer een verborgen schakelaar.',
               oplossing: 'boekenkast',
               opgelost: false}]
};

const gameState: GameState = {
    inventaris: [],
    ontsnapt: false
}

let openingsBeschrijving = '';

async function startSpel(actie: PlayerAction) {
    openingsBeschrijving = await beschrijfKamer(escapeRoom);

    const resultaat = verwerkActie(actie, escapeRoom, gameState);

    if(actie.type === 'kijk') {
        console.log(openingsBeschrijving);
    } else {
        console.log(resultaat);
    }
}

startSpel({type: 'inventaris', doel: ''});



