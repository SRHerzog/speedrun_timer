import { GameSplits } from './types';

export const defaultGameCategory: GameSplits = {
    best: 0,
    category: 'No category',
    completedRuns: 0,
    game: 'No game',
    resets: 0,
    segments: [{
        name: 'split 1',
    }, {
        name: 'split 2',
    }, {
        name: 'split 3',
    }],
    unsaved: false,
};
