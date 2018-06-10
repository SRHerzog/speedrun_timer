import * as React from 'react';

import { autobind } from 'core-decorators';
import { inject, observer } from 'mobx-react';

import { secondsToHMS } from '../../util';

// import { RunSettings } from '../../types';
import TimerState from '../timerState';

interface IProps {
    timerState?: TimerState;
}

@inject('timerState')
@observer
@autobind
export default class NewClass extends React.Component<IProps, any> {
    render() {
        return (
            <div>
                <p><strong>PB: </strong>{secondsToHMS(this.props.timerState.pbTime)}</p>
                <p><strong>Sum of best: </strong>{secondsToHMS(this.props.timerState.sumOfBest)}</p>
            </div>
        );
    }
}
