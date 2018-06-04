import { action, /*computed, */observable } from 'mobx';

// const targetInterval: number = 10;

export default class TimerState {
    @observable curTime: number = 0;
    @observable startTime: number = 0;

    running: boolean = false;

    constructor() {
    }

    @action.bound start(): void {
        this.startTime = performance.now();
        this.running = true;
        this.tickTime();
    }

    @action.bound stop(): void {
        this.running = false;
    }

    @action.bound tickTime(): void {
        this.curTime = performance.now();
        if (this.running) {
            window.requestAnimationFrame(this.tickTime);
        }
    }
}
