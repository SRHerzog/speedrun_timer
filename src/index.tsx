import * as React from 'react';
import { render } from 'react-dom';

import { Provider } from 'mobx-react';

import LocalIO from './apis/localSaves';
import SpeedRunComApi from './apis/speedrunComApi';

import AppState from './appState';
import SplitStore from './splits/splitStore';
import TimerState from './timer/timerState';

import Timer from './timer';
import DefineSplits from './splits/components/DefineSplits';
import ChooseGame from './splits/components/ChooseGame';

export default class Application extends React.Component<any, any> {
    appState: AppState;
    localIO: LocalIO;
    splitStore: SplitStore;
    srcApi: SpeedRunComApi;
    timerState: TimerState;

    constructor(props) {
        super(props);

        this.appState = new AppState();
        this.localIO = new LocalIO(this.appState);
        this.srcApi = new SpeedRunComApi();
        this.splitStore = new SplitStore(this.localIO, this.srcApi);
        this.timerState = new TimerState(this.splitStore);
    }
    render() {
        return (
            <Provider
                appState={this.appState}
                localIO={this.localIO}
                splitStore={this.splitStore}
                srcApi={this.srcApi}
                timerState={this.timerState}
            >   
                <div>
                    <Timer />
                    <DefineSplits />
                    <ChooseGame />
                </div>
            </Provider>
        );
    }
}

render(<Application />, document.getElementById('root'));
