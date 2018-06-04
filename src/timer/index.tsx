import * as React from 'react';

// import { autobind } from 'core-decorators';
// import { inject, observer } from 'mobx-react';

import MainTimer from './components/MainTimer';

// @inject('appState')
// @observer
// @autobind
export default class NewClass extends React.Component<any, any> {

    render() {
        return (
            <div>
                <MainTimer />
            </div>
        );
    }
}
