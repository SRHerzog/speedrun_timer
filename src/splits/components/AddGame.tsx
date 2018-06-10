import * as React from 'react';

import { autobind } from 'core-decorators';
import * as _ from 'lodash';
import { inject, observer } from 'mobx-react';

import SpeedRunComApi, { Game } from '../../apis/speedrunComApi';

interface IProps {
    selectGame: (game: Game) => void;
    srcApi?: SpeedRunComApi;
}

interface IState {
    gameName: string;
}

@inject('srcApi')
@observer
@autobind
export default class AddGame extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.setState({
            gameName: '',
        });
    }

    setGameName(event: React.ChangeEvent<HTMLInputElement>): void {
        this.setState({ gameName: event.target.value });
    }

    search(): void {
        this.props.srcApi.searchGames(this.state.gameName);
    }

    select(game: Game): void {
        this.props.selectGame(game);
        this.props.srcApi.fetchCategoriesForGame(game.id);
    }

    render() {
        return (
            <div>
                <h2>Add game</h2>
                <input
                    id="gameName"
                    type="text"
                    placeholder="Search by name..."
                    onChange={this.setGameName}
                    value={this.state.gameName}
                />
                <button
                    onClick={this.search}
                >Search
                </button>
                {this.props.srcApi.searchingGames &&
                    <div>Searching...</div>
                }
                {!this.props.srcApi.searchingGames && !!this.props.srcApi.foundGameNames.length &&
                    <div>
                        <h3>Found games (click to select)</h3>
                        <ul>
                            {_.map(this.props.srcApi.searchResults, (game: Game) =>
                                <li
                                    key={game.name}
                                    onSelect={() => this.select(game)}
                                >{game.name}
                                </li>,
                            )}
                        </ul>
                    </div>
                }
            </div>
        );
    }
}
