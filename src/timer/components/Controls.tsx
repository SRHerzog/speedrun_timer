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
export default class SplitControls extends React.Component<IProps, any> {
    render() {
        return (
            <div>
                <button
                    onClick={this.props.timerState.start}
                >start
                </button>
                <button
                    onClick={this.props.timerState.split}
                >split
                </button>
                <button
                    onClick={this.props.timerState.skipSplit}
                >skip
                </button>
                <button
                    onClick={this.props.timerState.reset}
                >reset
                </button>
            </div>
        );
    }
}
