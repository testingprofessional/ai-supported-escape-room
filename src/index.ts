import type { EscapeRoom } from './models/room.js';
import type { PlayerAction } from './models/action.js';
import type { GameState } from './models/game-state.js';
import { verwerkActie } from './game/game-engine.js';

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

//test-cases
console.log(verwerkActie({
    type: 'los-op',
    doel: 'Cijfercode',
    antwoord: '1234'
}, escapeRoom, gameState));

console.log(verwerkActie({
    type: 'los-op',
    doel: 'Cijfercode',
    antwoord: '2580'
}, escapeRoom, gameState));

console.log(verwerkActie({
    type: 'los-op',
    doel: 'Cijfercode',
    antwoord: '2580'
}, escapeRoom, gameState));

console.log(verwerkActie({
    type: 'los-op',
    doel: 'Geheime deur',
    antwoord: '1234'
}, escapeRoom, gameState));

console.log(verwerkActie({
    type: 'los-op',
    doel: 'Verborgen schakelaar'
}, escapeRoom, gameState));

console.log(verwerkActie({
    type: "nieuw-spel",
    doel: ""
}, escapeRoom, gameState));
