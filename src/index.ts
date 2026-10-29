import type { EscapeRoom } from './models/room.js';
import type { GameState } from './models/game-state.js';
import { beschrijfKamer } from './ai/room-narrator.js';
import { verwerkActie } from './game/game-engine.js';
import type { PlayerAction } from './models/action.js';

let openingsBeschrijving = '';

const gameState: GameState = {
    inventaris: [],
    ontsnapt: false
}

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

async function verwerkSpelerActie(actie: PlayerAction) {
    if(actie.type === 'kijk') {
        if(openingsBeschrijving === '') {
            openingsBeschrijving = await beschrijfKamer(escapeRoom);
        }
        console.log(openingsBeschrijving);
    } else {
        const resultaat = verwerkActie(actie, escapeRoom, gameState);
        console.log(resultaat);
    }
}

async function startSpel(actie: PlayerAction) {
    if(openingsBeschrijving === '') {
        openingsBeschrijving = await beschrijfKamer(escapeRoom);
    }
    console.log(openingsBeschrijving);
}

async function main() {
    await startSpel({type: 'kijk', doel: ''});
    await startSpel({type: 'kijk', doel: ''});
    await verwerkSpelerActie({type: 'inventaris', doel: ''});
}

main();



