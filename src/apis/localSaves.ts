// import * as _ from 'lodash';

const ipcRenderer: any = null;

import AppState from '../appState';
// import { postJSON } from '../util';

export default class LocalIO {
    constructor(appState: AppState) {
        window['splitsIO'] = this;
    }

    saveRunSettings(settings: any[]): Promise<any> {
        if (ipcRenderer) {
            // TODO: file save
            return Promise.resolve();
        } else {
            localStorage.setItem('runSettings', JSON.stringify(settings));
            return Promise.resolve();
        }
    }

    loadRunSettings(): Promise<any[]> {
        if (ipcRenderer) {
            // TODO: file load
            return Promise.resolve([]);
        } else {
            const runSettings = localStorage.getItem('runSettings');
            if (runSettings) {
                return Promise.resolve(JSON.parse(runSettings));
            }
            return Promise.resolve([]);
        }
    }
}
