import { action, computed, IObservableArray, observable, /*toJS, */when } from 'mobx';

import SplitStore from '../splits/splitStore';

import { defaultGameCategory } from '../defaults';
import { CategorySegment, Run, RunSettings } from '../types';

// const targetInterval: number = 10;

export default class TimerState {
    @observable currentSettings: RunSettings = defaultGameCategory;
    @observable curSplits: IObservableArray<number> = observable.array([]);
    @observable curTime: number = 0;
    @observable paused: boolean = false;
    @observable pauseStart: number = 0;
    @observable pauseSegments: IObservableArray<number> = observable.array([]);
    @observable runsInSession: IObservableArray<Run> = observable.array([]);
    @observable splitIndex: number = 0;
    @observable startTime: number = 0;

    running: boolean = false;
    splitStore: SplitStore;

    constructor(splitStore: SplitStore) {
        window['timerState'] = this;
        this.splitStore = splitStore;
    }

    @action.bound start(): void {
        this.curSplits.clear();
        this.startTime = performance.now();
        this.running = true;
        this.tickTime();
        this.pauseSegments.replace([0]);
    }

    @action.bound split(): void {
        if (this.paused) {
            return;
        }
        this.curSplits.push((this.curTime - this.startTime) / 1000);
        if (this.curSplits.length === this.currentSettings.segments.length) {
            this.currentSettings.completedRuns++;
            this.updatePB();
            this.running = false;
            this.splitStore.saveTimes();
        } else {
            this.pauseSegments.push(0);
        }
        this.checkGold();
    }

    @action.bound skipSplit(): void {
        this.curSplits.push(0);
    }

    @action.bound pause(): void {
        if (!this.paused) {
            this.paused = true;
            this.pauseStart = this.curTime;
        } else {
            this.paused = false;
            this.pauseSegments[this.pauseSegments.length - 1] += this.curTime - this.pauseStart;
        }
    }

    @action.bound reset(): void {
        this.running = false;
        this.startTime = 0;
        this.curTime = 0;
        if (this.splitIndex < this.currentSettings.segments.length - 1) {
            this.currentSettings.attempts++;
            this.splitStore.saveTimes();
        }
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
        const segment: CategorySegment = this.currentSettings.segments[splitIndex];
        console.log({ segment, splitIndex });
        if (!segment.gold ||
            (splitIndex === 0 && this.curSplits[splitIndex] < segment.gold) ||
            (splitIndex > 0 && this.curSplits[splitIndex] - this.curSplits[splitIndex - 1] < segment.gold)) {
            if (splitIndex === 0) {
                segment.gold = this.curSplits[splitIndex];
            } else {
                segment.gold = this.curSplits[splitIndex] - this.curSplits[splitIndex - 1];
            }
        }
    }

    @action.bound updatePB(): void {
        if (!this.pbTime || this.elapsedTime < this.pbTime) {
            this.currentSettings.best = this.elapsedTime;
            this.curSplits.forEach((split: number, index: number) => {
                if (!index) {
                    this.currentSettings.segments[index].pb = split;
                } else {
                    this.currentSettings.segments[index].pb = split - this.curSplits[index - 1];
                }
            });
        }
    }

    // @computed get currentRun(): Run {
    //     return this.runsInSession[this.runsInSession.length - 1];
    // }

    @computed get elapsedTime(): number {
        return (this.curTime - this.startTime) / 1000;
    }

    @action.bound selectSettings(settings: RunSettings): void {
        this.currentSettings = settings;
        this.saveLast();
    }

    @action.bound saveLast(): void {
        console.log('saving last settings');
        localStorage.setItem('lastSettings', `${this.currentSettings.gameName}_${this.currentSettings.categoryName}`);
    }

    @action.bound loadLast(): void {
        console.log('loading last settings');
        const lastSettings: string = localStorage.getItem('lastSettings');
        if (lastSettings) {
            const [gameName, categoryName] = lastSettings.split('_');
            when(() => !!this.splitStore && !!this.splitStore.savedSettings.length, () => {
                const foundSettings: RunSettings = this.splitStore.savedSettings.find(
                    (item: RunSettings) => item.gameName === gameName && item.categoryName === categoryName);
                if (foundSettings) {
                    this.selectSettings(foundSettings);
                }
            });
        }
    }

    @computed get pbTime(): number {
        return this.currentSettings.segments.reduce((output: number, item: CategorySegment) =>
            output + item.pb, 0);
    }

    @computed get sumOfBest(): number {
        return this.currentSettings.segments.reduce((output: number, item: CategorySegment) =>
            output + item.gold, 0);
    }
}
