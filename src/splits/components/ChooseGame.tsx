import * as React from 'react';

import { autobind } from 'core-decorators';
import { inject, observer } from 'mobx-react';

import { RunSettings } from '../../types';
import TimerState from '../../timer/timerState';
import SplitStore from '../splitStore';

interface IProps {
    splitStore?: SplitStore;
    timerState?: TimerState;
}

@inject('splitStore', 'timerState')
@observer
@autobind
export default class NewClass extends React.Component<IProps, any> {
    renderSettingsItem(item: RunSettings, index: number): JSX.Element {
        return (
            <div className="settingsSelect" key={`${item.gameName}_${item.categoryName}`}>
                <h4><strong>{item.gameName}</strong></h4>
                <h4>{item.categoryName}</h4>
                <button
                    onClick={() => this.props.timerState.selectSettings(item)}
                >Select
                </button>
                <button
                    onClick={() => this.props.splitStore.editSettings(index)}
                >Edit
                </button>
            </div>
        );
    }

    render() {
        return (
            <div>
                {!this.props.splitStore.savedSettings.length &&
                    <h2>No saved settings found.</h2>
                }
                {!!this.props.splitStore.savedSettings.length &&
                    this.props.splitStore.savedSettings.map(this.renderSettingsItem)
                }
                <div>
                    <button
                        onClick={this.props.splitStore.createNewSettings}
                    >Create new
                    </button>
                </div>
            </div>
        );
    }
}
