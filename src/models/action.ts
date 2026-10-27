export type ActionType = 'kijk' | 'inventaris' | 'pak' | 'los-op' | 'help' | 'nieuw-spel';

export interface PlayerAction {
    type: ActionType;
    doel: string;
    antwoord?: string;
}