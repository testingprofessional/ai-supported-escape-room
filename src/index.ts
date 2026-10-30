import type { EscapeRoom } from './models/room.js';
import type { GameState } from './models/game-state.js';
import { beschrijfKamer } from './ai/room-narrator.js';
import { verwerkActie, magHintOpvragen } from './game/game-engine.js';
import type { PlayerAction } from './models/action.js';
import { genereerHint } from './ai/hint-generator.js';
import { createInterface } from 'node:readline/promises';

const rl = createInterface({
    input: process.stdin,
    output: process.stdout
});

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
                                    puzzel => puzzel.naam.toLowerCase() === actie.doel.toLowerCase());
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
    while(true) {
        const invoer = await rl.question("Escape Room > ");

        const onderdelen = invoer.split(" ");
        const commando = onderdelen[0]!.toLowerCase();
        const antwoord = onderdelen[2];

        if(commando === "pak") {
            await verwerkSpelerActie({type: commando, doel: onderdelen[1]!})
        } else if(commando === "los-op") {
            const doelOnderdelen = onderdelen.slice(1, -1);
            const doel = doelOnderdelen.join(" ");
            await verwerkSpelerActie({type: commando, doel: doel, antwoord: onderdelen[onderdelen.length - 1]!});
        } else if (commando === "stop") {
            break;
        } else if (commando === "kijk") {
            await verwerkSpelerActie({
                type: "kijk",
                doel: ""
            });
        } else if (commando === "inventaris") {
            await verwerkSpelerActie({
                type: "inventaris",
                doel: ""
            });
        } else if (commando === "help") {
            const doelOnderdelen = onderdelen.slice(1);
            const doel = doelOnderdelen.join(" ");
            await verwerkSpelerActie({type: commando, doel: doel});
        } else if (commando === "info") {
            console.log("Mogelijke commando's");
            console.log("_____________________");
            console.log("kijk: Bekijk de kamer");
            console.log("inventaris: Bekijk je verzamelde voorwerpen");
            console.log("pak <voorwerp>: Pak een voorwerp op");
            console.log("los-op <puzzel> <antwoord>: Probeer een puzzel op te lossen");
            console.log("help <puzzel>: Vraag een hint voor een puzzel");
            console.log("nieuw-spel: Start een nieuw spel");
            console.log("stop: Beëindig het spel");
            console.log("info: Toon deze informatie");
        } else {
            console.log("Het commando is onbekend");
            console.log("Type 'info' voor meer informatie over de mogelijke commando's.");
        }
    }
    rl.close();
}

main();



