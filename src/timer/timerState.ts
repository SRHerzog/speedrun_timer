import { action, computed, IObservableArray, observable } from 'mobx';

import { defaultGameCategory } from '../defaults';
import { GameSplits, Run } from '../types';

// const targetInterval: number = 10;

export default class TimerState {
    @observable gameCategory: GameSplits = defaultGameCategory;
    @observable curSplits: IObservableArray<number> = observable.array([]);
    @observable curTime: number = 0;
    @observable runsInSession: IObservableArray<Run> = observable.array([]);
    @observable splitIndex: number = 0;
    @observable startTime: number = 0;

    running: boolean = false;

    // constructor() {
    // }

    @action.bound start(): void {
        this.startTime = performance.now();
        this.running = true;
        this.tickTime();
    }

    @action.bound split(): void {
        this.curSplits.push((this.curTime - this.startTime) / 1000);
        if (this.curSplits.length === this.gameCategory.segments.length) {
            this.updatePB();
            this.running = false;
            // TODO: sync with local storage 
        }
        this.checkGold();
    }

    @action.bound skipSplit(): void {
        this.curSplits.push(0);
    }

    @action.bound reset(): void {
        this.running = false;
        this.startTime = 0;
        this.curTime = 0;
        if (this.splitIndex < this.gameCategory.segments.length - 1) {
            this.gameCategory.resets++;
        } else {
            this.gameCategory.completedRuns++;
        }
        // TODO: sync with local storage
        this.curSplits.clear();
    }

    @action.bound tickTime(): void {
        if (this.running) {
            this.curTime = performance.now();
            window.requestAnimationFrame(this.tickTime);
        }
    }

    @action.bound purgeRuns(): void {
        this.runsInSession.clear();
    }

    @action.bound checkGold(): void {
        const splitIndex: number = this.curSplits.length - 1;
        if (this.curSplits[splitIndex] - this.gameCategory.segments[splitIndex].gold) {
            this.gameCategory.segments[splitIndex].gold = this.curSplits[splitIndex];
        }
    }

    @action.bound updatePB(): void {
        if (this.elapsedTime < this.gameCategory.best) {
            this.gameCategory.best = this.elapsedTime;
            this.curSplits.forEach((split: number, index: number) => {
                this.gameCategory.segments[index].pb = split;
            })
        }
    }

    @computed get currentRun(): Run {
        return this.runsInSession[this.runsInSession.length - 1];
    }

    @computed get elapsedTime(): number {
        return (this.curTime - this.startTime) / 1000;
    }
}
