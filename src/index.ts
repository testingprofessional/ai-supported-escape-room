import type { EscapeRoom } from './models/room.js';
import type { GameState } from './models/game-state.js';
import { beschrijfKamer } from './ai/room-narrator.js';
import { verwerkActie, magHintOpvragen } from './game/game-engine.js';
import type { PlayerAction } from './models/action.js';
import { genereerHint } from './ai/hint-generator.js';

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
               opgelost: false,
               hints: ['Onderzoek de voorwerpen zorgvuldig en let op details die je eerder over het hoofd zag.']},
              {naam: 'Verborgen schakelaar',
               beschrijving: 'Er zit ergens in de kamer een verborgen schakelaar.',
               oplossing: 'boekenkast',
               opgelost: false,
               hints: []}]
};

async function verwerkSpelerActie(actie: PlayerAction) {
    if(actie.type === 'kijk') {
        if(openingsBeschrijving === '') {
            try {
                openingsBeschrijving = await beschrijfKamer(escapeRoom);
            } catch {
                console.warn('AI-beschrijving mislukt. De vaste beschrijving wordt gebruikt.');
                openingsBeschrijving = escapeRoom.beschrijving;
            }
        }
        console.log(openingsBeschrijving);
    } else if(actie.type === 'help') {
        const puzzel = escapeRoom.puzzels.find(
                                    puzzel => puzzel.naam === actie.doel);
                                if(!puzzel) {
                                    console.log("Deze puzzel bestaat niet.");
                                    return;
                                }
                                if(!magHintOpvragen(puzzel)) {
                                    console.log("Deze puzzel is al opgelost.");
                                    return;
                                }
                                try {
                                    const hint = await genereerHint(puzzel);
                                    console.log(hint);
                                } catch {
                                    console.log("Er is geen hint beschikbaar voor deze puzzel.");
                                }
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
    //await startSpel({type: 'kijk', doel: ''});
    //await verwerkSpelerActie({type: 'inventaris', doel: ''});
    //const hint = await genereerHint(escapeRoom.puzzels[0]!);
    //console.log(hint);
    await verwerkSpelerActie({type: 'help', doel: 'Cijfercode'});
    await verwerkSpelerActie({type: 'help', doel: 'Bestaat_niet'});
    await verwerkSpelerActie({type: 'help', doel: 'Verborgen schakelaar'});
}

main();



