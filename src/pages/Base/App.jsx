// How hot reloading is working?
// Hot reloading is nothing but Injecting the new version of source files dynamically (runtime)
// whenever we update the Component, its state will be preserved and wont reset

import React, { Component } from 'react';
import { hot } from 'react-hot-loader/root';
import { Header } from 'components';
// import {default as Home} from '../Home/Home';
import Home from '../Home/Home';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            error: null,
            errorInfo: null
        };
    }

    componentDidCatch(error, errorInformation) {
        this.setState({
            error,
            errorInfo
        });

        console.log('----> Error: ', error);
        console.log('----> Error Information', errorInformation);
    }

    render() {
        const { error, errorInfo } = this.state;

        if (error) {
            return (
                <React.Fragment>
                    <h1>Something went wrong. Error details are as below</h1>
                    <code>
                        {errorInfo}
                    </code>
                </React.Fragment>
            );
        }

        return (
            <React.Fragment>
                <Header />
                <section className="container">
                    <Home />
                </section>
            </React.Fragment>
        );
    }
}

export default hot(App);
