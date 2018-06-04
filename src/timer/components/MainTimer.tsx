import * as React from 'react';

import { autobind } from 'core-decorators';
import { inject, observer } from 'mobx-react';

import TimerState from '../timerState';

interface IProps {
    timerState?: TimerState;
}

@inject('timerState')
@observer
@autobind
export default class MainTimer extends React.Component<IProps, any> {
    render() {
        return (
            <div>
                <div>{((this.props.timerState.curTime - this.props.timerState.startTime) / 1000).toFixed(2)}</div>
                <button
                    onClick={this.props.timerState.start}
                >start</button>
                <button
                    onClick={this.props.timerState.stop}
                >stop</button>
            </div>
        );
    }
}
