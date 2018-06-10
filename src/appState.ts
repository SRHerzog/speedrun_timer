import { observable } from 'mobx';

export default class AppState {
    @observable runnerName: string;

    sampleProperty: string = 'success';
    constructor() {
        console.log('app state initialized');
    }
}
