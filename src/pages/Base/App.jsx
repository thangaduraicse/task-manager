// How hot reloading is working?
// Hot reloading is nothing but Injecting the new version of source files dynamically (runtime)
// whenever we update the Component, its state will be preserved and wont reset

import React, { Component } from 'react';
import { hot } from 'react-hot-loader/root';
import Header from '../../components/Header/Header';

class App extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Header />
                <div>This is personal task manager</div>
                <div>Added</div>
                <div>Added 5</div>
            </React.Fragment>
        );
    }
}

export default hot(App);
