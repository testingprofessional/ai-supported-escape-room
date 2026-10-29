import type { EscapeRoom } from '../models/room.js';
import type { GameState } from '../models/game-state.js';
import type { Puzzle } from '../models/puzzle.js';
import type { PlayerAction } from '../models/action.js';

export function pakVoorwerp(voorwerp: string, escapeRoom: EscapeRoom, gameState: GameState): boolean {
    if(!escapeRoom.voorwerpen.includes(voorwerp)) {
        return false; 
    } 
    if(gameState.inventaris.includes(voorwerp)) {
        return false;
    }
    gameState.inventaris.push(voorwerp);
    return true;
}

export function losPuzzelOp(puzzel: Puzzle, antwoord: string): string {
    if(puzzel.opgelost) {
        return "Deze puzzel is al opgelost."
    }
    if(puzzel.oplossing === antwoord) {
        puzzel.opgelost = true;
        return "De puzzel is opgelost.";
    }
    return "Het antwoord klopt niet.";
}

export function kanOntsnappen(escapeRoom: EscapeRoom, gameState: GameState): boolean {
    if(escapeRoom.puzzels.every(puzzel => puzzel.opgelost) && gameState.inventaris.includes("Sleutel")) {
        return true;
    }
    return false;
}

export function controleerOntsnapping(escapeRoom: EscapeRoom, gameState: GameState): string {
    if (kanOntsnappen(escapeRoom, gameState)) {
        gameState.ontsnapt = true;
        return "Je hebt alle puzzels opgelost en ontsnapt uit de kamer!";
    }
    return "Je kunt nog niet ontsnappen. Los alle puzzels op en verzamel de sleutel.";
}

export function startNieuwSpel(gameState: GameState, escapeRoom: EscapeRoom): void {
    gameState.inventaris = [];
    gameState.ontsnapt = false;
    escapeRoom.puzzels.forEach(puzzel => puzzel.opgelost = false);
}

export function magHintOpvragen(puzzel: Puzzle): boolean {
    return !puzzel.opgelost;
}

export function verwerkActie(actie: PlayerAction, escapeRoom: EscapeRoom, gameState: GameState): string {
    if(gameState.ontsnapt && actie.type !== 'nieuw-spel') {
        return "Je bent al ontsnapt. Het spel is afgelopen.";
    }

    switch(actie.type) {
        case "kijk": return escapeRoom.beschrijving;
        case "inventaris": const inventarisTekst: string = gameState.inventaris.length === 0
                            ? "Je inventaris is leeg."
                            : "Je inventaris bevat: " + gameState.inventaris.join(", ");

                            return inventarisTekst;
        case "pak": const actieGeslaagd: boolean = pakVoorwerp(actie.doel, escapeRoom, gameState);
                        if(actieGeslaagd) {
                            if(kanOntsnappen(escapeRoom, gameState)) {
                                    return controleerOntsnapping(escapeRoom, gameState);
                                }
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
                            if(kanOntsnappen(escapeRoom, gameState)) {
                                return controleerOntsnapping(escapeRoom, gameState);
                            }
                        }
                        return resultaat;
        case "help": const puzzel2 = escapeRoom.puzzels.find(
                            puzzel => puzzel.naam === actie.doel);
                        if(!puzzel2) {
                            return "Deze puzzel bestaat niet.";
                        }
                        if(puzzel2.opgelost) {
                            return "Deze puzzel is al opgelost."
                        }
                        return "Hint gevonden.";
        case "nieuw-spel": startNieuwSpel(gameState, escapeRoom);
                           return "Er is een nieuw spel gestart.";
        default: return "Onbekende actie."
    }
}