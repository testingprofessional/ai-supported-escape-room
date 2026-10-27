export type ActionType = 'kijk' | 'inventaris' | 'pak' | 'los-op' | 'help';

export interface PlayerAction {
    type: ActionType;
    doel: string;
}