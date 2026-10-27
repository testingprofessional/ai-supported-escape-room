import type { EscapeRoom } from './models/room.js';
import type { PlayerAction } from './models/action.js';
import type { GameState } from './models/game-state.js'

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

const actie: PlayerAction = {
    type: 'pak',
    doel: 'Sleutel'
};

const gameState: GameState = {
    inventaris: [],
    ontsnapt: false
}

function pakVoorwerp(voorwerp: string, escapeRoom: EscapeRoom): boolean {
    if(!escapeRoom.voorwerpen.includes(voorwerp)) {
        return false; 
    } 
    if(gameState.inventaris.includes(voorwerp)) {
        return false;
    }
    gameState.inventaris.push(voorwerp);
    return true;
}

function verwerkActie(actie: PlayerAction): string {
    switch(actie.type) {
        case "kijk": return "Je bekijkt de kamer.";
        case "inventaris": return "Je bekijkt je inventaris";
        case "pak": const actieGeslaagd: boolean = pakVoorwerp(actie.doel, escapeRoom);
                    if(actieGeslaagd) {
                        return "Je hebt het voorwerp opgepakt."
                    }
                    return "Je kunt dit voorwerp niet oppakken."
        case "los-op": return "Deze actie wordt nog niet ondersteund.";
        case "help": return "Deze actie wordt nog niet ondersteund.";
        default: return "Onbekende actie."
    }
}

console.log('Inventaris:', gameState.inventaris);
console.log(verwerkActie({ type: 'pak', doel: 'Sleutel' }));
console.log(verwerkActie({ type: 'pak', doel: 'Sleutel' }));
console.log(verwerkActie({ type: 'pak', doel: 'Diamant' }));
console.log('Inventaris:', gameState.inventaris);