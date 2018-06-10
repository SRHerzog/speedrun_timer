import * as React from 'react';

import { autobind } from 'core-decorators';
import { inject, observer } from 'mobx-react';

import TimerState from './timerState';

import Controls from './components/Controls';
import GameTitle from './components/GameTitle';
import MainTimer from './components/MainTimer';
import RunStats from './components/RunStats';
import SplitTimers from './components/SplitTimers';

import './style.scss';

interface IProps {
    timerState?: TimerState;
}

@inject('timerState')
@observer
@autobind
export default class TimerContainer extends React.Component<IProps, null> {
    componentDidMount(): void {
        this.props.timerState.loadLast();
    }

    render() {
        return (
            <div>
                <GameTitle />
                <MainTimer />
                <SplitTimers />
                <Controls />
                <RunStats />
            </div>
        );
    }
}
