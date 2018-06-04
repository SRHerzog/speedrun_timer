import * as React from 'react';

// import { autobind } from 'core-decorators';
// import { inject, observer } from 'mobx-react';

import MainTimer from './components/MainTimer';
import SplitTimers from './components/SplitTimers';
import Controls from './components/Controls';

import './style.scss';

// @inject('appState')
// @observer
// @autobind
export default class TimerContainer extends React.Component<any, any> {

    render() {
        return (
            <div>
                <MainTimer />
                <SplitTimers />
                <Controls />
            </div>
        );
    }
}
