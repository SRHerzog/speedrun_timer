import { RunSettings } from './types';

export const defaultGameCategory: RunSettings = {
    attempts: 0,
    best: 0,
    categoryName: 'No category',
    completedRuns: 0,
    gameName: 'No game',
    segments: [{
        gold: 0,
        name: 'split 1',
        pb: 0,
    }, {
        gold: 0,
        name: 'split 2',
        pb: 0,
    }, {
        gold: 0,
        name: 'split 3',
        pb: 0,
    }],
    unsaved: false,
};
