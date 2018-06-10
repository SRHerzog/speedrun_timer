import * as React from 'react';

import { autobind } from 'core-decorators';
import * as _ from 'lodash';
import { inject, observer } from 'mobx-react';

import { Segment } from '../../types';
import TimerState from '../timerState';

interface IProps {
    timerState?: TimerState;
}

@inject('timerState')
@observer
@autobind
export default class SplitTimers extends React.Component<IProps, any> {
    render() {
        return (
            <div>
                {_.map(this.props.timerState.currentSettings.segments, (segment: Segment, index: number) => (
                    <div key={segment.name} className="splitRow">
                        <div>{this.props.timerState.currentSettings.segments[index].name}</div>
                        {this.props.timerState.curSplits.length === index && index === 0 &&
                            <div>{this.props.timerState.elapsedTime.toFixed(2)}</div>
                        }
                        {this.props.timerState.curSplits.length === index && index > 0 &&
                            <div>{(this.props.timerState.elapsedTime - this.props.timerState.curSplits[index - 1]).toFixed(2)}</div>
                        }
                        {this.props.timerState.curSplits.length > index && index === 0 &&
                            <div>{this.props.timerState.curSplits[index].toFixed(2)}</div>
                        }
                        {this.props.timerState.curSplits.length > index && index > 0 &&
                            <div>{(this.props.timerState.curSplits[index] - this.props.timerState.curSplits[index -1]).toFixed(2)}</div>
                        }
                        {this.props.timerState.curSplits.length < index &&
                            <div>-</div>
                        }
                        {this.props.timerState.curSplits.length === index &&
                            <div>{this.props.timerState.elapsedTime.toFixed(2)}</div>
                        }
                        {this.props.timerState.curSplits.length > index &&
                            <div>{this.props.timerState.curSplits[index].toFixed(2)}</div>
                        }
                        {this.props.timerState.curSplits.length < index &&
                            <div>-</div>
                        }
                    </div>
                ))}
                {/* TODO: 'previous segment' row */}
            </div>
        );
    }
}
