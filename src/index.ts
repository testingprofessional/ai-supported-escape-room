import type { EscapeRoom } from './models/room.js';
import type { PlayerAction } from './models/action.js';
import type { GameState } from './models/game-state.js';
import type { Puzzle } from './models/puzzle.js';

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
        case "kijk": return escapeRoom.beschrijving;
        case "inventaris": const inventarisTekst: string = gameState.inventaris.length === 0
                            ? "Je inventaris is leeg."
                            : "Je inventaris bevat: " + gameState.inventaris.join(", ");

                            return inventarisTekst;
        case "pak": const actieGeslaagd: boolean = pakVoorwerp(actie.doel, escapeRoom);
                    if(actieGeslaagd) {
                        return "Je hebt het voorwerp opgepakt."
                    }
                    return "Je kunt dit voorwerp niet oppakken."
        case "los-op": const puzzel = escapeRoom.puzzels.find(
                            puzzel => puzzel.naam === actie.doel);
                        if(!puzzel) {
                            return "Deze puzzel bestaat niet.";
                        }
                        if(!actie.antwoord) {
                            return "Je moet een antwoord invoeren.";
                        }
                        const resultaat = losPuzzelOp(puzzel, actie.antwoord);

                        if(resultaat === "De puzzel is opgelost.") {
                            if(kanOntsnappen()) {
                                return controleerOntsnapping();
                            }
                        }
                        return resultaat;
        case "help": return "Deze actie wordt nog niet ondersteund.";
        default: return "Onbekende actie."
    }
}

function losPuzzelOp(puzzel: Puzzle, antwoord: string): string {
    if(puzzel.opgelost) {
        return "Deze puzzel is al opgelost."
    }
    if(puzzel.oplossing === antwoord) {
        puzzel.opgelost = true;
        return "De puzzel is opgelost.";
    }
    return "Het antwoord klopt niet.";
}

function kanOntsnappen(): boolean {
    if(escapeRoom.puzzels.every(puzzel => puzzel.opgelost) && gameState.inventaris.includes("Sleutel")) {
        return true;
    }
    return false;
}

function controleerOntsnapping(): string {
    if (kanOntsnappen()) {
        gameState.ontsnapt = true;
        return "Je hebt alle puzzels opgelost en ontsnapt uit de kamer!";
    }

    return "Je kunt nog niet ontsnappen. Los alle puzzels op en verzamel de sleutel.";
}

// console.log(verwerkActie({ type: 'inventaris', doel: '' }));
// console.log(verwerkActie({ type: 'pak', doel: 'Sleutel' }));
// console.log(verwerkActie({ type: 'pak', doel: 'Sleutel' }));
// console.log(verwerkActie({ type: 'pak', doel: 'Diamant' }));
// console.log(verwerkActie({ type: 'kijk', doel: '' }));
// console.log(verwerkActie({ type: 'inventaris', doel: '' }));

// const cijfercode = escapeRoom.puzzels[0];

// console.log(losPuzzelOp(cijfercode, "1234"));
// console.log(losPuzzelOp(cijfercode, "2580"));
// console.log(losPuzzelOp(cijfercode, "2580"));

console.log(verwerkActie({
    type: 'los-op',
    doel: 'Cijfercode',
    antwoord: '1234'
}));

console.log(verwerkActie({
    type: 'los-op',
    doel: 'Cijfercode',
    antwoord: '2580'
}));

console.log(verwerkActie({
    type: 'los-op',
    doel: 'Cijfercode',
    antwoord: '2580'
}));

console.log(verwerkActie({
    type: 'los-op',
    doel: 'Geheime deur',
    antwoord: '1234'
}));

console.log(verwerkActie({
    type: 'los-op',
    doel: 'Verborgen schakelaar'
}));
