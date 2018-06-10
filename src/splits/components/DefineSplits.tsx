import * as React from 'react';

import { autobind } from 'core-decorators';
import * as _ from 'lodash';
import { inject, observer } from 'mobx-react';

// import { Category, Game } from '../../apis/speedrunComApi';

import SplitStore from '../splitStore';

import { CategorySegment } from '../../types';

// import AddCategory from './AddCategory';
// import AddGame from './AddGame';

interface IProps {
    splitStore?: SplitStore;
}

interface IState {
    // addCategory: boolean;
    // addGame: boolean;
}

@inject('splitStore')
@observer
@autobind
export default class DefineSplits extends React.Component<IProps, IState> {

    // selectGame(event: React.ChangeEvent<HTMLSelectElement>): void {
    //     this.props.splitStore.selectGame(event.target.value);
    // }

    // selectCategory(event: React.ChangeEvent<HTMLSelectElement>): void {
    //     this.props.splitStore.selectCategory(event.target.value);
    // }

    // openAddGameDialog(): void {
    //     this.setState({ addCategory: false, addGame: true });
    // }

    // openAddCategoryDialog(): void {
    //     this.setState({ addCategory: true, addGame: false });
    // }

    // closeDialogs(): void {
    //     this.setState({ addCategory: false, addGame: false });
    // }

    // selectNewGame(newGame: Game): void {
    //     this.props.splitStore.addNewGame(newGame.name);
    // }

    // selectNewCategory(category: Category): void {
    //     this.props.splitStore.createNewSettings({
    //         gameName: this.props.splitStore.newGame
    //     })
    // }

    setGameName(event: React.ChangeEvent<HTMLInputElement>): void {
        this.props.splitStore.settingsUnsaved = true;
        this.props.splitStore.currentSettings.gameName = event.target.value;
    }

    setCategoryName(event: React.ChangeEvent<HTMLInputElement>): void {
        this.props.splitStore.settingsUnsaved = true;
        this.props.splitStore.currentSettings.categoryName = event.target.value;
    }

    setOffset(event: React.ChangeEvent<HTMLInputElement>): void {
        this.props.splitStore.settingsUnsaved = true;
        this.props.splitStore.currentSettings.offset = +event.target.value;
    }

    setAttempts(event: React.ChangeEvent<HTMLInputElement>): void {
        this.props.splitStore.settingsUnsaved = true;
        this.props.splitStore.currentSettings.attempts = +event.target.value;
    }

    renderSegmentRow(segment: CategorySegment, index: number): JSX.Element {
        return (
            <tr key={index} className="segmentRow">
                <td />
                <td>
                    <input
                        id={`segment_index`}
                        value={segment.name}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                            this.updateSegmentName(event, segment)}
                    />
                </td>
                <td>
                    <button
                        onClick={() => this.deleteSegment(index)}
                    >Delete
                    </button>
                </td>
            </tr>
        );
    }

    updateSegmentName(event: React.ChangeEvent<HTMLInputElement>, segment: CategorySegment): void {
        this.props.splitStore.settingsUnsaved = true;
        segment.name = event.target.value;
    }

    addSegment(): void {
        this.props.splitStore.settingsUnsaved = true;
        this.props.splitStore.currentSettings.segments.push({
            gold: 0,
            name: '',
            pb: 0,
        });
    }

    deleteSegment(index: number): void {
        this.props.splitStore.settingsUnsaved = true;
        this.props.splitStore.currentSettings.segments.splice(index, 1);
    }

    render() {
        if (!this.props.splitStore.currentSettings) {
            return <div />;
        }
        return (
            <div>
                <label htmlFor="advanced">
                    Integrate with speedrun.com
                    <input
                        id="advanced"
                        type="checkbox"
                        checked={false} // it won't even let you check it
                    />
                </label>
                {/*}
                <select
                    value={this.props.splitStore.selectedOrFirstGame}
                    onChange={this.selectGame}
                >
                    {this.props.splitStore.availableGames.map((game: string) => (
                        <option value={game}>{game}</option>
                    ))}
                </select>
                <button
                    onClick={this.openAddGameDialog}
                >Add game
                </button>
                {!!this.props.splitStore.availableCategories.length &&
                    <select
                        onChange={this.selectCategory}
                    >
                        {this.props.splitStore.categoryNames.map((category: string) => (
                            <option value={category}>{category}</option>
                        ))}
                    </select>
                }
                <button
                    onClick={this.openAddGameDialog}
                >Add category
                </button>
                {this.state.addGame &&
                    <AddGame selectGame={this.selectNewGame} />
                }
                {this.state.addCategory &&
                    <AddCategory selectCategory={this.selectNewCategory} />
                }*/}
                <label>Game
                    <input
                        id="gameName"
                        type="text"
                        value={this.props.splitStore.currentSettings.gameName}
                        onChange={this.setGameName}
                    />
                </label>
                <label>Category
                    <input
                        id="categoryName"
                        type="text"
                        value={this.props.splitStore.currentSettings.categoryName}
                        onChange={this.setCategoryName}
                    />
                </label>
                <label>Offset
                    <input
                        id="offset"
                        type="text"
                        value={this.props.splitStore.currentSettings.offset}
                        onChange={this.setOffset}
                    />
                </label>
                <label>Attempts
                    <input
                        id="attempts"
                        type="text"
                        value={this.props.splitStore.currentSettings.attempts}
                        onChange={this.setAttempts}
                    />
                </label>
                <table className="segmentTable">
                    <thead>
                        <tr>
                            <th>Icon (NYI)</th>
                            <th>Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {_.map(this.props.splitStore.currentSettings.segments, this.renderSegmentRow)}
                    </tbody>
                </table>
                <div>
                    <button
                        onClick={this.addSegment}
                    >Add segment
                    </button>
                    {this.props.splitStore.settingsUnsaved &&
                        <button
                            onClick={this.props.splitStore.saveSettings}
                        >Save
                        </button>
                    }
                    <button
                        onClick={this.props.splitStore.discardChanges}
                    >Cancel
                    </button>
                </div>
            </div>
        );
    }
}
