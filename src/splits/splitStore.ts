import { action, /*computed, */IObservableArray, observable, toJS } from 'mobx';

import LocalIO from '../apis/localSaves';
import SpeedRunComApi, { /*Category, */Game } from '../apis/speedrunComApi';

import { /*CategorySegment, Segment, Run,*/ RunSettings } from '../types';

const defaultGameSettings: RunSettings = {
    attempts: 0,
    categoryId: 'n2y3r8do',
    categoryName: 'Any%',
    gameAbbreviation: 'sms',
    gameId: 'v1pxjz68',
    gameName: 'Super Mario Sunshine',
    offset: 0,
    segments: [{
        gold: 0,
        name: 'Beat Bowser',
        pb: 0,
    }],
};

export default class SplitStore {
    @observable savedSettings: IObservableArray<RunSettings> = observable.array([]);
    @observable currentSettings: RunSettings = null;
    @observable editingIndex: number = 0;
    @observable newGame: Game = null;
    @observable noGames: boolean = false;
    @observable ready: boolean = false;
    @observable settingsUnsaved: boolean = false;

    localSaves: LocalIO;
    srcApi: SpeedRunComApi;

    constructor(localSaves: LocalIO, srcApi: SpeedRunComApi) {
        this.localSaves = localSaves;
        this.srcApi = srcApi;

        window['splitStore'] = this;

        this.retrieveSettings()
        .then(() => {
            console.log('done retrieving');
            this.ready = true;
            if (!this.savedSettings.length) {
                this.createDefaultSettings();
            }
        }).catch((error: any) => {
            console.error(error);
            this.ready = true;
        });
    }

    @action.bound retrieveSettings(): Promise<any> {
        console.log('retrieving settings');
        return this.localSaves.loadRunSettings()
        .then((settings: any[]) => {
            console.log(settings);
            this.savedSettings.replace(settings);
        });
    }

    // @action.bound selectGame(game: Game): Promise<any> {
    //     return this.retrieveCategoriesForGame(game.name)
    //     .then(() => this.currentSettings = createViewModel(this.availableCategories[0]))
    //     .catch(console.error);
    // }

    // @action.bound selectCategory(categoryName: string): void {
    //     const foundSettings: RunSettings = this.availableCategories.find((item: RunSettings) =>
    //         item.categoryName === categoryName);
    //     this.currentSettings = createViewModel(foundSettings);
    // }

    @action.bound saveSettings(): void {
        this.currentSettings.unsaved = false;
        this.savedSettings[this.editingIndex] = observable(toJS(this.currentSettings));
        this.localSaves.saveRunSettings(toJS(this.savedSettings));
        this.currentSettings = null;
    }

    @action.bound saveTimes(): void {
        this.localSaves.saveRunSettings(toJS(this.savedSettings));
    }

    @action.bound discardChanges(): void {
        if (this.savedSettings.length > 1 || !this.currentSettings.unsaved) {
            if (this.currentSettings.unsaved) {
                this.savedSettings.pop();
            }
            this.currentSettings = null;
        } else {
            this.currentSettings = observable(toJS(this.savedSettings[0]));
        }
    }

    @action.bound editSettings(index: number): void {
        const settings: RunSettings = this.savedSettings[index];
        this.currentSettings = observable(toJS(settings));
        this.editingIndex = index;
        this.settingsUnsaved = false;
    }

    @action.bound createNewSettings(): void {
        this.savedSettings.push({
            attempts: 0,
            categoryName: '',
            gameName: '',
            segments: [{
                gold: 0,
                name: 'Beat the game',
                pb: 0,
            }],
            unsaved: true,
        });
        this.editSettings(this.savedSettings.length - 1);
        this.settingsUnsaved = true;
    }

    @action.bound createDefaultSettings(): void {
        this.savedSettings.push({
            ...defaultGameSettings,
            unsaved: true,
        });
        this.editSettings(this.savedSettings.length - 1);
        this.settingsUnsaved = true;
    }

    // @computed get categoryNames(): string[] {
    //     return this.availableCategories.map((item: RunSettings) => item.categoryName);
    // }
}
