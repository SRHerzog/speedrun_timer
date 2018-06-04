import * as React from 'react';
import { render } from 'react-dom';

import { Provider } from 'mobx-react';

import AppState from './appState';
import TimerState from './timer/timerState';

import Timer from './timer';

export default class Application extends React.Component<any, any> {
    appState: AppState;
    timerState: TimerState;

    constructor(props) {
        super(props);

        this.appState = new AppState();
        this.timerState = new TimerState();
    }
    render() {
        return (
            <Provider appState={this.appState} timerState={this.timerState}>
                <Timer />
            </Provider>
        );
    }
}

render(<Application />, document.getElementById('root'));
