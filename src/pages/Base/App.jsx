import React from 'react';
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

export default App;
