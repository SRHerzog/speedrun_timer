import * as _ from 'lodash';
import { action, computed, IObservableArray, observable } from 'mobx';

import { getJSON } from '../util';

const apiUrl: string = 'https://www.speedrun.com/api/v1';

export interface Category {
    id: string;
    game: string; // game id
    name: string;
    rules?: string;
}

export interface Game {
    abbreviation: string;
    id: string;
    name: string;
}

export default class SpeedRunComApi {
    @observable fetchingCategories: boolean = false;
    @observable fetchingRecords: boolean = false;
    @observable foundCategories: IObservableArray<Category> = observable.array([]);
    @observable searchResults: IObservableArray<Game> = observable.array([]);
    @observable searchingGames: boolean = false;

    constructor() {
        window['srCom'] = this;
    }

    pickGameFields(input: any): Game {
        return {
            abbreviation: input.abbreviation,
            id: input.id,
            name: input.names.twitch,
        };
    }

    pickCategoryFields(input: any, gameId: string): Category {
        return {
            game: gameId,
            id: input.id,
            name: input.name,
            rules: input.rules,
        };
    }

    @action.bound searchGames(query: string): Promise<any> {
        this.searchingGames = true;
        return getJSON(`${apiUrl}/games?=name=${query}`)
        .then((results: any) => {
            this.searchingGames = false;
            if (!results.data) {
                throw new Error('failed to search games');
            }
            this.searchResults.replace(_.map(results.data, this.pickGameFields));
        }).catch((error: any) => {
            console.error(error);
            this.searchingGames = false;
        });
    }

    @action.bound fetchCategoriesForGame(gameId: string): Promise<any> {
        this.fetchingCategories = true;
        return getJSON(`${apiUrl}/games/${gameId}/categories`)
        .then((results: any) => {
            this.fetchingCategories = false;
            if (!results.data) {
                throw new Error('failed to retrieve categories');
            }
            this.foundCategories.replace(_.map(results.data,
                (category: any) => this.pickCategoryFields(category, gameId)));
        }).catch((error: any) => {
            console.error(error);
            this.fetchingCategories = false;
        });
    }

    @action.bound fetchRecordsForGame(gameId: string): Promise<any> {
        this.fetchingRecords = true;
        return getJSON(`${apiUrl}/games/${gameId}/categories`)
        .then((results: any) => {
            this.fetchingRecords = false;
            return results;
        }).catch((error: any) => {
            console.error(error);
            this.fetchingRecords = false;
        })
    }

    @computed get foundGameNames(): string[] {
        return this.searchResults.map((item: Game) => item.name);
    }

    @computed get foundCategoryNames(): string[] {
        return this.foundCategories.map((item: Category) => item.name);
    }
}
