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
export default class NewClass extends React.Component<IProps, null> {
    render() {
        return (
            <header>
                <h1>{this.props.timerState.currentSettings.gameName}</h1>
                <h2>{this.props.timerState.currentSettings.categoryName}</h2>
            </header>
        );
    }
}
