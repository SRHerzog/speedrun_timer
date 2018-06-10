import * as React from 'react';

import { autobind } from 'core-decorators';
import * as _ from 'lodash';
import { inject, observer } from 'mobx-react';

import SpeedRunComApi, { Category } from '../../apis/speedrunComApi';

interface IProps {
    selectCategory: (category: Category) => void;
    srcApi?: SpeedRunComApi;
}

interface IState {
    gameName: string;
    tooltipText: string;
    tooltipX: number;
    tooltipY: number;
}

@inject('srcApi')
@observer
@autobind
export default class AddCategory extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.setState({
            gameName: '',
            tooltipText: '',
            tooltipX: 0,
            tooltipY: 0,
        });
    }

    setGameName(event: React.ChangeEvent<HTMLInputElement>): void {
        this.setState({ gameName: event.target.value });
    }

    search(): void {
        this.props.srcApi.searchGames(this.state.gameName);
    }

    showTooltip(event: React.MouseEvent<HTMLLIElement>, tooltipText: string): void {
        this.setState({ tooltipText, tooltipX: event.clientX, tooltipY: event.clientY });
    }

    hideTooltip(): void {
        this.setState({ tooltipText: '' });
    }

    render() {
        return (
            <div>
                <h2>Add category</h2>
                {this.props.srcApi.fetchingCategories &&
                    <div>Searching...</div>
                }
                {!this.props.srcApi.fetchingCategories && !!this.props.srcApi.foundGameNames.length &&
                    <div>
                        <h3>Available games (click to select)</h3>
                        <ul onMouseLeave={this.hideTooltip}>
                            {_.map(this.props.srcApi.foundCategories, (category: Category) =>
                                <li
                                    key={category.id}
                                    onClick={() => this.props.selectCategory(category)}
                                    onMouseEnter={(event: React.MouseEvent<HTMLLIElement>) =>
                                        this.showTooltip(event, category.rules)}
                                >
                                    {category.name}
                                </li>,
                            )}
                        </ul>
                    </div>
                }
            </div>
        );
    }
}
