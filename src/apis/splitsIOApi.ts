// import * as _ from 'lodash';
import { action, /*computed, */IObservableArray, observable } from 'mobx';

import AppState from '../appState';
// import { postJSON } from '../util';

export interface Segment {
    name: string;
    segment_number: number;
    realtime_start_ms: number;
    realtime_duration_ms: number;
    realtime_end_ms: number;
    realtime_gold: boolean;
    realtime_skipped: boolean;
    realtime_reduced: boolean;
}

export interface Run {
    attempts: number;
    game: string;
    category: number;
    realtime_duration_ms: number;
    realtime_sum_of_best_ms: number;
    segments: Segment[];
    [extraField: string]: any;
}

export default class SplitsIOApi {
    @observable savedRuns: IObservableArray<Run> = observable.array([]);

    constructor(appState: AppState) {
        window['splitsIO'] = this;
    }

    @action.bound saveRun(run: Run): Promise<void> {
        // TODO: fuck this for now do it later
        // const runToSave: Run = {
        //     ...run,
        //     default_timing: 'real',
        //     created_at: new Date(),
        //     program: 'bork_split',
        //     runners: this.appState.runnerName,
        //     updated_at: new Date(),
        // }
        // this.savingRun = true;
        // return postJSON(`${apiUrl}`);
        return null;
    }
}
