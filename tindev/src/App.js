import React, { Fragment } from 'react';
import { YellowBox } from 'react-native';
import Routes from './routes';

YellowBox.ignoreWarnings([
    'Unrecognized WebSocket'
])

const App = () => {
    return (
        <Fragment>
            <Routes />
        </Fragment>
    );
};


export default App;
